import { createEnumComponent } from '../EnumDisplay';
import get from 'lodash/get';

/**
 * 获取本地化标签
 */
export const getLabelForLocal = (item, locale) => {
  if (locale === 'en-US') {
    return get(item, 'enName') || get(item, 'chName');
  }
  return get(item, 'chName');
};

/**
 * 默认行业数据加载器
 */
export const defaultIndustryApi = {
  cache: 'INDUSTRY_DATA',
  isLocal: true,
  ttl: 1000 * 60 * 60 * 24, // 24小时
  loader: () => {
    return import('./industry.json').then(module => (module['__esModule'] ? module.default : module));
  }
};

/**
 * 行业枚举显示组件
 */
export const IndustryEnum = createEnumComponent({
  type: 'industry',
  cache: 'INDUSTRY_DATA',
  getLabel: getLabelForLocal,
  defaultApi: defaultIndustryApi
});

export default IndustryEnum;
