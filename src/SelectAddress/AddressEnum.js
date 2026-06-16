import { useMemo } from 'react';
import { withFetch } from '@kne/react-fetch';
import { useIntl } from '@kne/react-intl';
import get from 'lodash/get';
import { createAddressApi } from './Address';
import withLocale from '../withLocale';

/**
 * 获取本地化标签
 */
export const getLabelForLocal = (item, locale) => {
  if (locale === 'en-US') {
    return get(item, 'enName') || get(item, 'name');
  }
  return get(item, 'name');
};

/**
 * 默认地址数据加载器
 */
export const addressDefaultApi = {
  cache: 'CITY_DATA',
  isLocal: true,
  ttl: 1000 * 60 * 60 * 24, // 24小时
  loader: () => {
    return import('./city.json').then(module => (module['__esModule'] ? module.default : module));
  }
};

/**
 * 地址枚举显示组件
 */
const AddressEnumInner = withFetch(({ data, name, names, children, displayParent, ...props }) => {
  const { locale } = useIntl();
  const addressApi = useMemo(() => createAddressApi(data), [data]);

  const formatCityData = cityData => {
    const { city, parent } = cityData;
    if (!city) {
      return '';
    }
    if (displayParent && parent) {
      return `${getLabelForLocal(parent, locale)}·${getLabelForLocal(city, locale)}`;
    }
    return getLabelForLocal(city, locale);
  };

  if (names?.length) {
    const outputs = names.map(code => addressApi.getCity(code));
    const labels = outputs.map(formatCityData).filter(Boolean);

    if (children) {
      return children(outputs, { displayParent, locale, getLabelForLocal, names, labels, ...props });
    }

    return labels.toString();
  }

  // 获取城市数据
  const cityData = addressApi.getCity(name);
  const { city, parent } = cityData;

  // 如果提供了自定义渲染函数
  if (children) {
    return children(cityData, { displayParent, locale, getLabelForLocal, ...props });
  }

  // 默认渲染逻辑
  if (!city) {
    return '';
  }

  if (displayParent && parent) {
    return `${getLabelForLocal(parent, locale)}·${getLabelForLocal(city, locale)}`;
  }

  return getLabelForLocal(city, locale);
});

export const AddressEnum = withLocale(props => {
  const { displayParent = false, ...restProps } = props;

  return <AddressEnumInner {...addressDefaultApi} displayParent={displayParent} {...restProps} />;
});

AddressEnum.addressDefaultApi = addressDefaultApi;

export default AddressEnum;
