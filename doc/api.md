### SelectFunction 职能选择器

基于级联选择器的职能选择组件，支持多级职能数据的搜索和选择，适用于招聘、HR系统等业务场景。

#### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|-------|------|
| value | array \| object | [] | 当前选中的值，单选时为对象，多选时为数组 |
| onChange | function | - | 选中值变化时的回调函数 |
| single | boolean | false | 是否单选模式 |
| placeholder | string | '请选择职能' | 输入框占位符 |
| isPopup | boolean | true | 是否下拉模式，false 为弹窗模式 |
| overlayWidth | string \| number | '320px' | 选择器宽度 |
| onSearch | function | - | 自定义搜索函数，参数为 (searchText, { mapping }) |
| maxLength | number | - | 多选时最多可选数量 |
| disabled | boolean | false | 是否禁用 |
| style | object | - | 自定义样式 |
| className | string | - | 自定义类名 |

#### 静态方法

| 方法 | 说明 |
|------|------|
| SelectFunction.defaultData() | 获取默认职能数据，返回 Promise |
| SelectFunction.defaultProps | 组件默认属性配置 |

#### 数据结构

组件内部使用扁平化的职能数据结构，通过 `code` 和 `parentCode` 建立层级关系：

```javascript
{
  code: '001001001',        // 职能编码
  parentCode: '001001',     // 父级编码
  chName: '首席执行官CEO',  // 中文名称
  enName: 'CEO',           // 英文名称
  pinyin: 'shouzhixingguan', // 拼音
  spelling: 'szxg'         // 首字母缩写
}
```

---

### SelectIndustry 行业选择器

基于级联选择器的行业选择组件，支持多级行业数据的搜索和选择，适用于招聘、企业信息管理等业务场景。

#### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|-------|------|
| value | array \| object | [] | 当前选中的值，单选时为对象，多选时为数组 |
| onChange | function | - | 选中值变化时的回调函数 |
| single | boolean | false | 是否单选模式 |
| placeholder | string | '请选择行业' | 输入框占位符 |
| isPopup | boolean | true | 是否下拉模式，false 为弹窗模式 |
| overlayWidth | string \| number | '320px' | 选择器宽度 |
| onSearch | function | - | 自定义搜索函数，参数为 (searchText, { mapping }) |
| maxLength | number | - | 多选时最多可选数量 |
| disabled | boolean | false | 是否禁用 |
| style | object | - | 自定义样式 |
| className | string | - | 自定义类名 |

#### 静态方法

| 方法 | 说明 |
|------|------|
| SelectIndustry.defaultData() | 获取默认行业数据，返回 Promise |
| SelectIndustry.defaultProps() | 组件默认属性配置 |

#### 数据结构

组件内部使用扁平化的行业数据结构，通过 `code` 和 `parentCode` 建立层级关系：

```javascript
{
  code: '001',              // 行业编码
  parentCode: '',           // 父级编码
  chName: '互联网/电子通信/软件', // 中文名称
  enName: 'Internet/Telecoms/Software', // 英文名称
  pinyin: 'hulianwang',     // 拼音
  spelling: 'hlw'          // 首字母缩写
}
```

---

### SelectAddress 城市选择器

城市地址选择组件，支持国内外城市的搜索和选择，具备拼音搜索、首字母搜索等功能，适用于地址填写、城市筛选等业务场景。

#### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|-------|------|
| value | array \| object | [] | 当前选中的值，单选时为对象，多选时为数组 |
| onChange | function | - | 选中值变化时的回调函数 |
| single | boolean | false | 是否单选模式 |
| placeholder | string | '请选择城市' | 输入框占位符 |
| isPopup | boolean | true | 是否下拉模式，false 为弹窗模式 |
| overlayWidth | string \| number | '320px' | 选择器宽度 |
| searchPlaceholder | string | - | 搜索框占位符 |
| maxLength | number | - | 多选时最多可选数量 |
| disabled | boolean | false | 是否禁用 |
| style | object | - | 自定义样式 |
| className | string | - | 自定义类名 |

#### 静态方法

| 方法 | 说明 |
|------|------|
| SelectAddress.defaultData() | 获取默认城市数据，返回 Promise |
| SelectAddress.createAddressApi(cityData) | 根据城市数据创建地址 API 实例 |
| SelectAddress.defaultProps | 组件默认属性配置 |

#### Address API

`createAddressApi` 方法返回的对象包含以下方法：

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| getCity(id) | string: 城市ID | object: { city, parent } | 根据ID获取城市信息 |
| searchCities(value) | string: 搜索关键词 | array: 城市列表 | 搜索城市，支持拼音和首字母 |
| getCityList() | - | array: 城市列表 | 获取所有城市列表 |

#### 数据结构

城市数据包含国内外主要城市：

```javascript
{
  code: '010',             // 城市编码
  name: '北京',            // 城市名称
  enName: 'Beijing',       // 英文名称
  parentCode: '410',       // 父级编码
  pinyin: 'beijing',       // 拼音
  spelling: 'bj'           // 首字母缩写
}
```

---

### AddressEnum 地址枚举显示组件

用于显示城市名称的枚举组件，使用 `react-fetch` 加载数据，支持缓存和国际化。

#### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|-------|------|
| name | string | - | 城市编码，必需 |
| displayParent | boolean | false | 是否显示父级城市名称 |
| force | boolean | false | 是否强制刷新缓存 |
| children | function | - | 自定义渲染函数 |
| api | object | - | 自定义 API 配置 |

#### 自定义渲染函数

```javascript
children={({ city, parent }, { displayParent, locale, getLabelForLocal }) => {
  // city: 城市数据对象
  // parent: 父级城市数据对象
  // displayParent: 是否显示父级
  // locale: 当前语言环境
  // getLabelForLocal: 获取本地化标签的函数
  return <span>{getLabelForLocal(city, locale)}</span>;
}}
```

#### 静态方法

| 方法 | 说明 |
|------|------|
| AddressEnum.getLabelForLocal(item, locale) | 获取本地化标签 |
| AddressEnum.addressDefaultApi | 默认 API 配置 |

#### 使用示例

```jsx
// 基本用法
<AddressEnum name="010" />

// 显示父级
<AddressEnum name="010" displayParent />

// 自定义渲染
<AddressEnum name="010">
  {({ city, parent }, { getLabelForLocal, locale }) => (
    <div>
      {parent && <span>{getLabelForLocal(parent, locale)} · </span>}
      {getLabelForLocal(city, locale)}
    </div>
  )}
</AddressEnum>
```

---

### FunctionEnum 职能枚举显示组件

用于显示职能名称的枚举组件，使用 `react-fetch` 加载数据，支持缓存和国际化。

#### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|-------|------|
| name | string | - | 职能编码，与 names 二选一 |
| names | string[] | - | 职能编码数组，与 name 二选一，默认 label 数组 toString 输出 |
| force | boolean | false | 是否强制刷新缓存 |
| children | function | - | 自定义渲染函数 |
| api | object | - | 自定义 API 配置 |

#### 自定义渲染函数

```javascript
// 单个编码 name
children={(item, { locale, mapping, labels, names }) => {
  // item: 职能数据对象，包含 label, chName, enName 等
  // locale: 当前语言环境
  // mapping: 所有职能数据的 Map 对象
  // labels: 当前项的 label 数组
  return <span>{item.label}</span>;
}}

// 批量编码 names
children={(items, { locale, mapping, labels, names }) => {
  // items: 职能数据对象数组，无效编码对应 undefined
  // labels: 有效项的 label 字符串数组
  return <span>{labels.join('、')}</span>;
}}
```

#### 静态方法

| 方法 | 说明 |
|------|------|
| FunctionEnum.getLabelForLocal(item, locale) | 获取本地化标签 |
| FunctionEnum.defaultFunctionApi | 默认 API 配置 |

#### 使用示例

```jsx
// 基本用法
<FunctionEnum name="001001001" />

// 批量显示
<FunctionEnum names={['001001001', '001001002', '001001003']} />

// 自定义渲染
<FunctionEnum name="001001001">
  {(item, { locale }) => (
    <div>
      <span>{item.label}</span>
      {item.enName && <span>({item.enName})</span>}
    </div>
  )}
</FunctionEnum>

// 批量自定义渲染
<FunctionEnum names={['001001001', '001001002']}>
  {(items, { labels }) => labels.join(' / ')}
</FunctionEnum>
```

---

### IndustryEnum 行业枚举显示组件

用于显示行业名称的枚举组件，使用 `react-fetch` 加载数据，支持缓存和国际化。

#### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|-------|------|
| name | string | - | 行业编码，与 names 二选一 |
| names | string[] | - | 行业编码数组，与 name 二选一，默认 label 数组 toString 输出 |
| force | boolean | false | 是否强制刷新缓存 |
| children | function | - | 自定义渲染函数 |
| api | object | - | 自定义 API 配置 |

#### 自定义渲染函数

```javascript
// 单个编码 name
children={(item, { locale, mapping, labels, names }) => {
  // item: 行业数据对象，包含 label, chName, enName 等
  // locale: 当前语言环境
  // mapping: 所有行业数据的 Map 对象
  // labels: 当前项的 label 数组
  return <span>{item.label}</span>;
}}

// 批量编码 names
children={(items, { locale, mapping, labels, names }) => {
  // items: 行业数据对象数组，无效编码对应 undefined
  // labels: 有效项的 label 字符串数组
  return <span>{labels.join('、')}</span>;
}}
```

#### 静态方法

| 方法 | 说明 |
|------|------|
| IndustryEnum.getLabelForLocal(item, locale) | 获取本地化标签 |
| IndustryEnum.defaultIndustryApi | 默认 API 配置 |

#### 使用示例

```jsx
// 基本用法
<IndustryEnum name="001" />

// 批量显示
<IndustryEnum names={['001', '003', '004']} />

// 自定义渲染
<IndustryEnum name="001">
  {(item, { locale }) => (
    <div>
      <span>{item.label}</span>
      {item.enName && <span>({item.enName})</span>}
    </div>
  )}
</IndustryEnum>

// 批量自定义渲染
<IndustryEnum names={['001', '004']}>
  {(items, { labels }) => labels.join(' · ')}
</IndustryEnum>
```

---

### EnumDisplay 通用枚举显示组件

通用的枚举显示组件，支持自定义数据源、国际化、缓存等功能。

#### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|-------|------|
| name | string | - | 单个枚举值编码，与 names 二选一 |
| names | string[] | - | 多个枚举值编码，与 name 二选一，默认 label 数组 toString 输出 |
| type | string | - | 枚举类型标识 |
| cache | string | 'ENUM_DATA' | 缓存键名 |
| force | boolean | false | 是否强制刷新缓存 |
| children | function | - | 自定义渲染函数 |
| api | object | - | API 配置对象 |
| getLabel | function | - | 自定义标签获取函数 |

#### API 配置

```javascript
api={{
  cache: 'CUSTOM_DATA',      // 缓存键名
  isLocal: true,             // 是否本地数据
  ttl: 1000 * 60 * 60 * 24,  // 缓存时间（毫秒）
  loader: async () => {      // 数据加载函数
    return data;
  }
}}

// 或远程 API
api={{
  cache: 'REMOTE_DATA',
  url: '/api/enum',          // API 地址
  method: 'GET',             // 请求方法
  dataFormat: (data) => data // 数据格式化函数
}}
```

#### 自定义渲染函数

```javascript
// 单个编码 name
children={(item, { locale, mapping, labels, names }) => {
  // item: 枚举数据对象
  // locale: 当前语言环境
  // mapping: 所有枚举数据的 Map 对象
  // labels: 当前项的 label 数组
  return <span>{item.label}</span>;
}}

// 批量编码 names
children={(items, { locale, mapping, labels, names }) => {
  // items: 枚举数据对象数组，无效编码对应 undefined
  // labels: 有效项的 label 字符串数组
  // names: 传入的编码数组
  return <span>{labels.join('、')}</span>;
}}
```

#### 使用示例

```jsx
// 基本用法
<EnumDisplay
  name="1"
  type="education"
  api={{
    cache: 'EDUCATION_DATA',
    loader: async () => [
      { code: '1', name: '本科', enName: 'Bachelor' },
      { code: '2', name: '硕士', enName: 'Master' }
    ]
  }}
/>

// 批量显示
<EnumDisplay
  names={['1', '2', '3']}
  type="education"
  api={educationEnumApi}
/>

// 自定义 getLabel
<EnumDisplay
  name="1"
  type="education"
  api={api}
  getLabel={(item, locale) => {
    return locale === 'en-US' ? item.enName : item.name;
  }}
/>

// 批量自定义渲染
<EnumDisplay names={['1', '2', '3']} type="education" api={api}>
  {(items, { labels }) => labels.join(' / ')}
</EnumDisplay>
```

---

### 国际化支持

所有组件均支持国际化，通过 `@kne/react-intl` 实现：

#### 支持的语言

- 中文（zh-CN）：默认语言
- 英文（en-US）：备用语言

#### 使用方式

组件会根据当前 locale 自动切换语言：

- 中文名称（chName）优先显示中文环境
- 英文名称（enName）优先显示英文环境
- 当对应语言不存在时，会使用备选语言

#### 搜索功能

所有组件的搜索功能均支持：

- 中文名称搜索（chName）
- 英文名称搜索（enName）
- 拼音搜索（pinyin）
- 首字母搜索（spelling）
