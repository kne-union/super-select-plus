import { SelectCascader } from '@kne/super-select';
import { useIntl } from '@kne/react-intl';
import withLocale from '../withLocale';
import { useState, useEffect, useMemo } from 'react';
import get from 'lodash/get';

const getLabelForLocal = (item, locale) => {
  if (locale === 'en-US') {
    return get(item, 'enName') || get(item, 'chName');
  }
  return get(item, 'chName');
};

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

const IndustrySelectFieldInner = ({ value, onChange, single, placeholder, isPopup, overlayWidth, apis: currentApis, onSearch, ...props }) => {
  const { locale, formatMessage } = useIntl();
  const [data, setData] = useState([]);

  useEffect(() => {
    defaultIndustryData().then(result => {
      setData(result.data || result);
    });
  }, []);

  const options = useMemo(() => transformToCascaderData(data, locale), [data, locale]);

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
      value={value}
      onChange={onChange}
      single={single}
      placeholder={placeholder || formatMessage({ id: 'placeholder' }, { defaultMessage: '请选择行业' })}
      isPopup={isPopup}
      menuItemWidth={200}
      style={{ width: overlayWidth || 320, ...props.style }}
      options={options}
      valueKey="id"
      labelKey="name"
      onSearch={onSearch || handleSearch}
    />
  );
};

const IndustrySelectField = withLocale(IndustrySelectFieldInner);

IndustrySelectField.defaultProps = {
  overlayWidth: '320px',
  single: false,
  isPopup: true
};

IndustrySelectField.defaultData = defaultIndustryData;

export default IndustrySelectField;
