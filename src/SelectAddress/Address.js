import { SelectInput } from '@kne/super-select';
import { useIntl } from '@kne/react-intl';
import withLocale from '../withLocale';
import { useState, useEffect, useMemo, useCallback, forwardRef } from 'react';
import get from 'lodash/get';
import memoize from 'lodash/memoize';
import cloneDeep from 'lodash/cloneDeep';
import { Col, Divider, List, Row, Space, Tabs, Tag } from 'antd';
import AddressEnum from './AddressEnum';
import SearchInput from '@kne/search-input';
import '@kne/search-input/dist/index.css';
import classnames from 'classnames';
import style from './style.module.scss';
import { resolveAddressValue, shouldSyncSelectValue } from '../utils/resolveSelectValue';

const getLabelForLocal = (item, locale) => {
  if (locale === 'en-US') {
    return get(item, 'enName') || get(item, 'name');
  }
  return get(item, 'name');
};

export const defaultCityData = () => {
  return import('./city.json').then(module => (module['__esModule'] ? module.default : module));
};

const createAddressApi = ({ city, province, country }) => {
  const getSearchList = memoize(() => {
    const list = [];
    ['gangaotai', 'municipality'].forEach(name => {
      list.push(...(city.relations[name] || []));
    });
    ['provinces', 'continents'].forEach(name => {
      (city.relations[name] || []).forEach(id => {
        list.push(id);
        list.push(...(city.relations[id] || []));
      });
    });

    return list.map(id => city.list[id]).filter(Boolean);
  });

  const apis = {
    getCity: memoize(id => {
      const item = city.list[id] || apis.getCityByName(id);
      if (!item) {
        return { city: null, parent: null };
      }
      return {
        city: item,
        parent: item.parentCode ? city.list[item.parentCode] : null
      };
    }),
    getChinaHotCities: memoize(() => {
      return (city.relations['2'] || []).map(id => city.list[id]).filter(Boolean);
    }),
    getChinaCities: memoize(() => {
      return ['2', ...(province.relations.municipality || []), ...(province.relations.provinces || []), 'gangaotai'].map(id => Object.assign({ id }, city.list[id])).filter(item => item.code);
    }),
    getCountries: memoize(() => {
      return ['1', ...(country.relations.continents || [])].map(id => Object.assign({ id }, country.list[id])).filter(item => item.code);
    }),
    getList: memoize((pid, options) => {
      const { showChinaQuan, showForeignQuan } = Object.assign({}, options);
      if (pid === 'gangaotai') {
        return (province.relations['gangaotai'] || []).map(id => city.list[id]).filter(Boolean);
      }
      const current = Object.assign({}, city.list[pid]);
      if ((province.relations.municipality || []).indexOf(pid) > -1) {
        current.name = `${showChinaQuan ? '全' : ''}${current.name}`;
        return [current];
      }

      const list = (city.relations[pid] || []).map(id => city.list[id]).filter(Boolean);
      if ((province.relations.provinces || []).indexOf(pid) > -1 && showChinaQuan) {
        current.name = `全${current.name}`;
        list.splice(0, 0, current);
      }
      if ((country.relations.continents || []).indexOf(pid) > -1 && showForeignQuan) {
        current.name = `全${current.name}`;
        list.splice(0, 0, current);
      }
      return list;
    }),
    getNationalityList: memoize(pid => {
      let _city = cloneDeep(city);
      if (pid === '1') {
        _city.relations['1'].unshift('410');
      }
      if (pid === '350') {
        _city.relations['350'].unshift('410');
      }
      return _city.relations[pid].filter(id => _city.list[id]).map(id => _city.list[id]);
    }),
    getCityByName: memoize(name => {
      const searchList = getSearchList();
      let item;
      [item => item.name === name, item => item.name === name.replace(/(省|市)$/, ''), item => name.indexOf(item.name) === 0].find(func => {
        item = searchList.find(func);
        return item;
      });
      return item;
    }),
    combineCities: memoize((currentId, list) => {
      return [
        ...list.filter(item => {
          return city.list[item].parentCode !== currentId && city.list[currentId].parentCode !== item && currentId !== item;
        }),
        currentId
      ];
    }),
    searchCities: memoize(value => {
      if (!value) {
        return [];
      }
      const searchList = getSearchList();
      return searchList
        .filter(item => {
          return ['pinyin', 'name', 'enName', 'spelling'].some(name => {
            return (item[name] || '').toUpperCase().indexOf(value.toUpperCase()) > -1;
          });
        })
        .map(item => {
          const parent = item.parentCode ? city.list[item.parentCode] : null;
          return {
            label: parent ? `${parent.name}·${item.name}` : item.name,
            value: item.code,
            ...item
          };
        });
    }),
    getCityList: memoize(() => {
      return Object.values(city.list).map(item => ({
        ...item,
        value: item.code,
        label: item.name
      }));
    })
  };

  return apis;
};

const AddressInner = ({ value, setValue, props }) => {
  const { locale, formatMessage } = useIntl();
  const [searchText, setSearchText] = useState('');
  const [menuKey, setMenuKey] = useState('2');
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    defaultCityData().then(result => {
      setCityData(result);
    });
  }, []);

  const addressApi = useMemo(() => {
    if (!cityData) return null;
    return createAddressApi(cityData);
  }, [cityData]);

  const { getCity, getChinaCities, getCountries, getList, searchCities } = addressApi || {};

  const onSelect = useCallback(
    code => {
      const cityInfo = cityData?.city?.list?.[code];
      if (!cityInfo) return;

      const item = {
        value: code,
        label: cityInfo.name,
        ...cityInfo
      };

      if (props.single) {
        setValue([item]);
        return;
      }

      setValue(prev => {
        const newValue = prev.slice(0);
        const index = newValue.findIndex(v => v.value === code);
        if (index > -1) {
          newValue.splice(index, 1);
        } else {
          newValue.push(item);
        }
        return newValue;
      });
    },
    [cityData, props.single, setValue]
  );

  if (!addressApi) {
    return null;
  }

  const selectedValues = (value || []).map(v => v.value);

  const searchInner = searchText && (
    <div className={style['scroll-plus-box']}>
      <List
        className={style['list']}
        size="small"
        dataSource={searchCities(searchText)}
        rowKey="value"
        renderItem={item => (
          <List.Item
            className={style['list-item']}
            onClick={() => {
              onSelect(item.value);
              setSearchText('');
            }}
          >
            <span className={style['item-label']}>{item.label}</span>
          </List.Item>
        )}
      />
    </div>
  );

  const currentCity = getCity?.(menuKey);

  return (
    <div
      className={classnames(style['address'], {
        [style['is-popup']]: props.isPopup
      })}
    >
      <SearchInput
        className={classnames(style['search-input'], {
          [style['is-popup']]: props.isPopup,
          'is-popup': props.isPopup
        })}
        placeholder={props.searchPlaceholder || formatMessage({ id: 'addressSearchPlaceholder' }, { defaultMessage: '搜索城市' })}
        value={searchText}
        onChange={e => {
          setSearchText(e.target.value);
        }}
        onSearch={value => {
          setSearchText(value);
        }}
      />
      <div className={style['content']}>
        {searchInner || (
          <Row wrap={false}>
            <Col className={style['col-left']}>
              <Tabs
                centered
                onChange={activeKey => {
                  setMenuKey(activeKey);
                }}
                items={[
                  {
                    key: '2',
                    label: formatMessage({ id: 'domestic' }, { defaultMessage: '国内' }),
                    children: (
                      <div className={style['scroll-box']}>
                        <List
                          className={style['menu-list']}
                          dataSource={getChinaCities()}
                          rowKey="id"
                          renderItem={item => (
                            <List.Item
                              className={menuKey === item.id ? 'selected' : ''}
                              onClick={() => {
                                setMenuKey(item.id);
                              }}
                            >
                              {getLabelForLocal(item, locale)}
                            </List.Item>
                          )}
                        />
                      </div>
                    )
                  },
                  {
                    key: '1',
                    label: formatMessage({ id: 'abroad' }, { defaultMessage: '国外' }),
                    children: (
                      <div className={style['scroll-box']}>
                        <List
                          className={style['menu-list']}
                          dataSource={getCountries()}
                          rowKey="id"
                          renderItem={item => (
                            <List.Item
                              className={menuKey === item.id ? 'selected' : ''}
                              onClick={() => {
                                setMenuKey(item.id);
                              }}
                            >
                              {getLabelForLocal(item, locale)}
                            </List.Item>
                          )}
                        />
                      </div>
                    )
                  }
                ]}
              />
            </Col>
            <Col flex={1} className={style['col-right']}>
              <Divider className={style['title']} orientation="left">
                {currentCity?.city ? getLabelForLocal(currentCity.city, locale) : ''}
              </Divider>
              <div className={style['scroll-box']}>
                <Space wrap>
                  {getList(menuKey, {
                    showChinaQuan: props.showChinaQuan,
                    showForeignQuan: props.showForeignQuan
                  }).map(item => (
                    <Tag.CheckableTag
                      checked={selectedValues.indexOf(item.code) > -1}
                      onChange={() => {
                        onSelect(item.code);
                      }}
                      key={item.code}
                    >
                      {getLabelForLocal(item, locale)}
                    </Tag.CheckableTag>
                  ))}
                </Space>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

const SelectAddressInner = forwardRef((props, ref) => {
  const { formatMessage } = useIntl();
  const { value, single, onChange, ...restProps } = props;
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    defaultCityData().then(setCityData);
  }, []);

  const addressApi = useMemo(() => (cityData ? createAddressApi(cityData) : null), [cityData]);

  const normalizedValue = useMemo(() => resolveAddressValue(value, addressApi, { single }), [value, addressApi, single]);

  useEffect(() => {
    if (!onChange || !addressApi) {
      return;
    }
    const resolved = resolveAddressValue(value, addressApi, { single });
    if (shouldSyncSelectValue(value, resolved, { valueKey: 'value', labelKey: 'label', single })) {
      onChange(resolved);
    }
  }, [value, addressApi, single, onChange]);

  return (
    <SelectInput ref={ref} {...restProps} single={single} value={normalizedValue} onChange={onChange} placeholder={restProps.placeholder || formatMessage({ id: 'addressPlaceholder' }, { defaultMessage: '请选择城市' })}>
      {contextProps => {
        const { value: currentValue, setValue } = contextProps;
        return <AddressInner value={currentValue} setValue={setValue} props={props} />;
      }}
    </SelectInput>
  );
});

const SelectAddress = withLocale(({ single = false, isPopup = true, showChinaQuan = false, showForeignQuan = false, ...props }) => {
  return <SelectAddressInner single={single} isPopup={isPopup} showChinaQuan={showChinaQuan} showForeignQuan={showForeignQuan} {...props} />;
}, 'SelectAddress');

SelectAddress.defaultData = defaultCityData;
SelectAddress.createAddressApi = createAddressApi;
SelectAddress.Enum = AddressEnum;

export default SelectAddress;
export { createAddressApi };
