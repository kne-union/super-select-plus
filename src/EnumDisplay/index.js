import { useMemo } from 'react';
import { withFetch } from '@kne/react-fetch';
import { useIntl } from '@kne/react-intl';
import withLocale from '../withLocale';
import get from 'lodash/get';

// 统一缓存映射
const enumCache = new Map();

// 默认子组件渲染函数
const defaultChildren = item => get(item, 'label', '');

/**
 * 默认获取标签函数
 */
const defaultGetLabel = (item, locale) => {
  if (locale === 'en-US') {
    return get(item, 'enName') || get(item, 'name') || get(item, 'chName');
  }
  return get(item, 'name') || get(item, 'chName');
};

/**
 * 默认数据格式化函数
 */
const defaultDataFormat = data => data.data || data;

/**
 * 默认映射项转换函数
 */
const defaultTransformItem = (item, label) => ({
  ...item,
  id: item.code,
  label,
  parentId: item.parentCode || null
});

/**
 * 内部枚举显示组件
 */
const EnumDisplayInner = withFetch(({ data, name, type, cache: cacheKey, children, getLabel, dataFormat, transformItem, ...props }) => {
  const { locale } = useIntl();

  // 格式化数据
  const formattedData = useMemo(() => dataFormat(data), [data, dataFormat]);

  // 创建映射表
  const mapping = useMemo(() => {
    return new Map(
      formattedData.map(item => {
        const label = getLabel(item, locale);
        const transformedItem = transformItem(item, label);
        return [item.code, transformedItem];
      })
    );
  }, [formattedData, getLabel, locale, transformItem]);

  // 获取枚举值
  const output = mapping.get(name);

  // 缓存结果
  if (output && cacheKey && type) {
    enumCache.set(`${cacheKey}_${type}_${name}`, output);
  }

  return children(output, { ...props, locale, mapping });
});

/**
 * 枚举显示组件
 */
export const EnumDisplay = withLocale(props => {
  const { locale } = useIntl();
  const { name, type = 'default', cache: cacheKey = 'ENUM_DATA', force = false, getLabel = defaultGetLabel, dataFormat = defaultDataFormat, transformItem = defaultTransformItem, children = defaultChildren } = props;

  // 检查缓存
  const key = `${cacheKey}_${type}_${name}`;
  const cached = enumCache.get(key);

  if (cached && !force) {
    return children(cached, { locale: props.locale });
  }

  return <EnumDisplayInner {...props} type={type} cache={cacheKey} getLabel={getLabel} dataFormat={dataFormat} transformItem={transformItem} children={children} />;
});

/**
 * 创建特定枚举组件的工厂函数
 * @param {Object} options 配置选项
 * @param {string} options.type 枚举类型标识
 * @param {string} options.cache 缓存键
 * @param {Function} options.getLabel 获取标签函数
 * @param {Function} options.dataFormat 数据格式化函数
 * @param {Function} options.transformItem 映射项转换函数
 * @param {Object} options.defaultApi 默认API配置
 * @returns {React.Component} 枚举组件
 */
export const createEnumComponent = options => {
  const { type, cache, getLabel = defaultGetLabel, dataFormat = defaultDataFormat, transformItem = defaultTransformItem, defaultApi } = options;

  const EnumComponent = withLocale(props => {
    const { name, force = false, children = defaultChildren } = props;

    // 检查缓存
    const key = `${cache}_${type}_${name}`;
    const cached = enumCache.get(key);

    if (cached && !force) {
      return children(cached, { locale: props.locale });
    }

    return <EnumDisplayInner {...props} {...defaultApi} type={type} cache={cache} getLabel={getLabel} dataFormat={dataFormat} transformItem={transformItem} children={children} />;
  });

  // 附加静态属性
  EnumComponent.getLabel = getLabel;
  EnumComponent.defaultApi = defaultApi;
  EnumComponent.type = type;
  EnumComponent.cache = cache;

  return EnumComponent;
};

// 导出缓存实例供外部使用
EnumDisplay.cache = enumCache;

export default EnumDisplay;
