import { SelectCascader } from '@kne/super-select';
import { useIntl } from '@kne/react-intl';
import withLocale from '../withLocale';
import { useState, useEffect, useMemo } from 'react';
import get from 'lodash/get';
import IndustryEnum, { getLabelForLocal } from './IndustryEnum';
import { resolveCascaderValueFromMap, shouldSyncSelectValue } from '../utils/resolveSelectValue';

const defaultIndustryData = () => {
  return import('./industry.json').then(module => (module['__esModule'] ? module.default : module));
};

const transformToCascaderData = (data, locale) => {
  // 过滤掉"全部行业"
  const filteredData = data.filter(item => item.code !== '000');

  // 创建映射表
  const mapping = new Map();
  filteredData.forEach(item => {
    mapping.set(item.code, {
      ...item,
      id: item.code,
      name: getLabelForLocal(item, locale),
      children: []
    });
  });

  // 构建嵌套结构
  const roots = [];
  filteredData.forEach(item => {
    const node = mapping.get(item.code);
    if (!item.parentCode || !mapping.has(item.parentCode)) {
      roots.push(node);
    } else {
      const parent = mapping.get(item.parentCode);
      parent.children.push(node);
    }
  });

  // 清理空的 children 数组
  const cleanEmptyChildren = nodes => {
    nodes.forEach(node => {
      if (node.children && node.children.length === 0) {
        delete node.children;
      } else if (node.children && node.children.length > 0) {
        cleanEmptyChildren(node.children);
      }
    });
  };
  cleanEmptyChildren(roots);

  return roots;
};

const SelectIndustryInner = ({ value, onChange, single = false, placeholder, isPopup = true, overlayWidth = 320, apis: currentApis, onSearch, ...props }) => {
  const { locale, formatMessage } = useIntl();
  const [data, setData] = useState([]);

  useEffect(() => {
    defaultIndustryData().then(result => {
      setData(result.data || result);
    });
  }, []);

  const options = useMemo(() => transformToCascaderData(data, locale), [data, locale]);

  const flatMapping = useMemo(() => {
    const mapping = new Map();
    data
      .filter(item => item.code !== '000')
      .forEach(item => {
        mapping.set(item.code, {
          ...item,
          id: item.code,
          name: getLabelForLocal(item, locale)
        });
      });
    return mapping;
  }, [data, locale]);

  const normalizedValue = useMemo(() => resolveCascaderValueFromMap(value, flatMapping, { valueKey: 'id', labelKey: 'name', single }), [value, flatMapping, single]);

  useEffect(() => {
    if (!onChange || !flatMapping.size) {
      return;
    }
    const resolved = resolveCascaderValueFromMap(value, flatMapping, { valueKey: 'id', labelKey: 'name', single });
    if (shouldSyncSelectValue(value, resolved, { valueKey: 'id', labelKey: 'name', single })) {
      onChange(resolved);
    }
  }, [value, flatMapping, single, onChange]);

  const handleSearch = (searchText, { mapping }) => {
    if (!searchText) return Array.from(mapping.values());
    const keyword = searchText.toLowerCase();
    return Array.from(mapping.values()).filter(item => {
      return (
        (item.chName && item.chName.toLowerCase().includes(keyword)) ||
        (item.enName && item.enName.toLowerCase().includes(keyword)) ||
        (item.pinyin && item.pinyin.toLowerCase().includes(keyword)) ||
        (item.spelling && item.spelling.toLowerCase().includes(keyword))
      );
    });
  };

  return (
    <SelectCascader
      {...props}
      value={normalizedValue}
      onChange={onChange}
      single={single}
      placeholder={placeholder || formatMessage({ id: 'placeholder' }, { defaultMessage: '请选择行业' })}
      isPopup={isPopup}
      overlayWidth={overlayWidth}
      menuItemWidth={200}
      style={{ width: overlayWidth, ...props.style }}
      options={options}
      valueKey="id"
      labelKey="name"
      onSearch={onSearch || handleSearch}
    />
  );
};

const SelectIndustry = withLocale(SelectIndustryInner);

SelectIndustry.defaultData = defaultIndustryData;
SelectIndustry.Enum = IndustryEnum;

export default SelectIndustry;
export { IndustryEnum };
