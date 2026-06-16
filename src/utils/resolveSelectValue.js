export const findNodeInOptions = (options, id, valueKey = 'id') => {
  if (!options?.length || id == null) {
    return null;
  }
  for (const node of options) {
    if (node[valueKey] === id) {
      return node;
    }
    if (node.children) {
      const found = findNodeInOptions(node.children, id, valueKey);
      if (found) {
        return found;
      }
    }
  }
  return null;
};

const getItemId = (item, valueKey = 'id') => {
  if (item == null) {
    return null;
  }
  if (typeof item !== 'object') {
    return item;
  }
  return item[valueKey] ?? item.id ?? item.code ?? null;
};

const getItemLabel = (item, labelKey = 'name') => {
  if (item == null || typeof item !== 'object') {
    return null;
  }
  return item[labelKey] ?? item.label ?? item.name ?? null;
};

const resolveItemFromNode = (item, node, { valueKey = 'id', labelKey = 'name' } = {}) => {
  const id = getItemId(item, valueKey);
  if (id == null) {
    return item;
  }

  if (!node) {
    const label = getItemLabel(item, labelKey);
    if (typeof item === 'object') {
      return label != null && label !== String(id) ? item : { ...(typeof item === 'object' ? item : {}), [valueKey]: id, [labelKey]: label || String(id) };
    }
    return { [valueKey]: id, [labelKey]: String(id) };
  }

  const label = getItemLabel(item, labelKey) || node[labelKey] || node.name;
  return {
    ...node,
    ...(typeof item === 'object' ? item : {}),
    [valueKey]: id,
    [labelKey]: label
  };
};

/**
 * 通过扁平 Map 解析 value（推荐，不依赖级联树结构）
 */
export const resolveCascaderValueFromMap = (value, mapping, { valueKey = 'id', labelKey = 'name', single = false } = {}) => {
  if (value == null || !mapping?.size) {
    return value;
  }

  const resolveItem = item => resolveItemFromNode(item, mapping.get(getItemId(item, valueKey)), { valueKey, labelKey });

  if (single) {
    const current = Array.isArray(value) ? value[0] : value;
    return current != null ? resolveItem(current) : value;
  }

  return Array.isArray(value) ? value.map(resolveItem) : value;
};

/**
 * 将仅含编码的 value 从 options 解析为含 label 的完整对象（职能/行业级联选择器）
 */
export const resolveCascaderValue = (value, options, optionsConfig) => {
  if (value == null || !options?.length) {
    return value;
  }

  const { valueKey = 'id', labelKey = 'name', single = false } = optionsConfig || {};
  const mapping = new Map();

  const collect = items => {
    items.forEach(node => {
      mapping.set(node[valueKey], node);
      if (node.children?.length) {
        collect(node.children);
      }
    });
  };
  collect(options);

  return resolveCascaderValueFromMap(value, mapping, { valueKey, labelKey, single });
};

/**
 * 将仅含编码的 value 解析为含 label 的完整对象（城市选择器）
 */
export const resolveAddressValue = (value, addressApi, { single = false } = {}) => {
  if (value == null || !addressApi) {
    return value;
  }

  const resolveItem = item => {
    if (item == null) {
      return item;
    }

    const code = typeof item === 'object' ? (item.value ?? item.code) : item;
    if (!code) {
      return typeof item === 'object' ? item : null;
    }

    const label = typeof item === 'object' ? (item.label ?? item.name) : null;
    if (label && label !== String(code)) {
      return typeof item === 'object' ? item : { value: code, label };
    }

    const { city } = addressApi.getCity(code);
    return city ? { value: code, label: city.name, ...city } : { value: code, label: String(code) };
  };

  if (single) {
    const current = Array.isArray(value) ? value[0] : value;
    return current != null ? resolveItem(current) : value;
  }

  return Array.isArray(value) ? value.map(resolveItem) : value;
};

/**
 * 判断是否需要将解析后的 value 同步回 onChange（仅编码 -> 含 label）
 */
export const shouldSyncSelectValue = (value, resolved, { valueKey = 'id', labelKey = 'name', single = false } = {}) => {
  if (resolved == null || value == null) {
    return false;
  }

  const needSyncItem = (original, resolvedItem) => {
    const id = getItemId(original, valueKey);
    const resolvedId = getItemId(resolvedItem, valueKey);
    if (id == null || id !== resolvedId) {
      return false;
    }
    const resolvedLabel = getItemLabel(resolvedItem, labelKey);
    if (!resolvedLabel || resolvedLabel === String(id)) {
      return false;
    }
    const valueLabel = getItemLabel(original, labelKey);
    return !valueLabel || valueLabel === String(id);
  };

  if (single) {
    const original = Array.isArray(value) ? value[0] : value;
    const resolvedItem = Array.isArray(resolved) ? resolved[0] : resolved;
    return needSyncItem(original, resolvedItem);
  }

  if (!Array.isArray(value) || !Array.isArray(resolved)) {
    return false;
  }

  return resolved.some((item, index) => needSyncItem(value[index], item));
};
