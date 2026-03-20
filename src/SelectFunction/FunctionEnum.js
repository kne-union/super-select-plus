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
 * 默认职能数据加载器
 */
export const defaultFunctionApi = {
  cache: 'FUNCTION_DATA',
  isLocal: true,
  ttl: 1000 * 60 * 60 * 24, // 24小时
  loader: () => {
    return import('./function.json').then(module => (module['__esModule'] ? module.default : module));
  }
};

/**
 * 职能枚举显示组件
 */
export const FunctionEnum = createEnumComponent({
  type: 'function',
  cache: 'FUNCTION_DATA',
  getLabel: getLabelForLocal,
  defaultApi: defaultFunctionApi
});

export default FunctionEnum;
