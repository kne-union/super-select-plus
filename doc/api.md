### FunctionSelectField 职能选择器

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
| FunctionSelectField.defaultData() | 获取默认职能数据，返回 Promise |
| FunctionSelectField.defaultProps | 组件默认属性配置 |

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

### IndustrySelectField 行业选择器

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
| IndustrySelectField.defaultData() | 获取默认行业数据，返回 Promise |
| IndustrySelectField.defaultProps | 组件默认属性配置 |

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

### AddressSelectField 城市选择器

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
| AddressSelectField.defaultData() | 获取默认城市数据，返回 Promise |
| AddressSelectField.createAddressApi(cityData) | 根据城市数据创建地址 API 实例 |
| AddressSelectField.defaultProps | 组件默认属性配置 |

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
  code: '101010100',        // 城市编码
  name: '北京',             // 城市名称
  enName: 'Beijing',       // 英文名称
  parentCode: '10101',     // 父级编码
  pinyin: 'beijing',       // 拼音
  spelling: 'bj'          // 首字母缩写
}
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
