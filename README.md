# super-select-plus

### 安装

```shell
npm i --save @kne/super-select-plus
```

### 概述

### 项目概述

`@kne/super-select-plus` 是一个基于 `@kne/super-select` 封装的 React 业务选择器组件库，提供职能、行业、城市等常见业务场景的选择器组件。所有组件均支持国际化、拼音搜索、单选/多选等功能。

### 主要特性

- **丰富的业务选择器**：提供职能选择器、行业选择器、城市选择器三大核心组件
- **级联选择支持**：职能和行业选择器基于级联选择器实现，支持多级数据选择
- **智能搜索**：支持中英文搜索、拼音搜索、首字母搜索
- **国际化支持**：内置中英文切换，可根据语言环境自动切换显示内容
- **灵活的展示模式**：支持下拉菜单和弹窗两种展示模式
- **数量限制**：支持设置最大选择数量
- **单选/多选**：所有组件均支持单选和多选模式

### 组件列表

| 组件名称 | 功能描述 | 基础组件 |
|---------|---------|---------|
| FunctionSelectField | 职能选择器，支持多级职能数据选择 | SelectCascader |
| IndustrySelectField | 行业选择器，支持多级行业数据选择 | SelectCascader |
| AddressSelectField | 城市选择器，支持国内外城市搜索选择 | SelectInput |

### 快速选择指南

| 需求 | 推荐组件 |
|------|---------|
| 招聘系统职能选择 | FunctionSelectField |
| 企业行业分类选择 | IndustrySelectField |
| 地址填写、城市筛选 | AddressSelectField |
| 需要多级联动选择 | FunctionSelectField 或 IndustrySelectField |
| 需要快速搜索选择 | AddressSelectField |

### 安装

```bash
npm install @kne/super-select-plus
```

### 快速开始

```jsx
import { FunctionSelectField, IndustrySelectField, AddressSelectField } from '@kne/super-select-plus';
import '@kne/super-select-plus/dist/index.css';

// 职能选择
function FunctionExample() {
  const [value, setValue] = useState([]);
  return (
    <FunctionSelectField
      value={value}
      onChange={setValue}
      placeholder="请选择职能"
    />
  );
}

// 行业选择
function IndustryExample() {
  const [value, setValue] = useState(null);
  return (
    <IndustrySelectField
      single
      value={value}
      onChange={setValue}
      placeholder="请选择行业"
    />
  );
}

// 城市选择
function AddressExample() {
  const [value, setValue] = useState([]);
  return (
    <AddressSelectField
      value={value}
      onChange={setValue}
      placeholder="请选择城市"
    />
  );
}
```

### 技术栈

- React 18+
- @kne/super-select - 核心选择器组件库
- @kne/react-intl - 国际化支持
- lodash - 工具函数库

### 数据来源

组件内置了丰富的业务数据：

- **职能数据**：包含完整的职位职能分类，支持三级职能体系
- **行业数据**：覆盖主要行业分类，支持多级行业结构
- **城市数据**：包含国内外主要城市，支持按省份、国家分类

所有数据支持中英文双语，可通过组件的静态方法获取原始数据进行自定义处理。


### 示例

#### 示例代码

- FunctionSelectField 职能选择器
- 基于级联选择器的职能选择组件，支持多级职能数据的选择，具备搜索、单选/多选等功能
- _SuperSelectPlus(@kne/current-lib_super-select-plus)[import * as _SuperSelectPlus from "@kne/super-select-plus"],antd(antd)

```jsx
const { FunctionSelectField } = _SuperSelectPlus;
const { Flex, Divider, Tag, Switch } = antd;
const { useState } = React;

// 基础多选示例
const BasicMultiExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>多选职能：</span>
      <FunctionSelectField
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择职能"
        style={{ width: 320 }}
      />
      {value.length > 0 && (
        <Flex wrap gap={4}>
          {value.map((item) => (
            <Tag key={item.id} color="blue">
              {item.name}
            </Tag>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

// 单选示例
const SingleSelectExample = ({ isPopup }) => {
  const [value, setValue] = useState(null);

  return (
    <Flex vertical gap={8}>
      <span>单选职能：</span>
      <FunctionSelectField
        single
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择职能"
        style={{ width: 320 }}
      />
      {value && <Tag color="green">已选：{value.name}</Tag>}
    </Flex>
  );
};

// 数量限制示例
const MaxLimitExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>最多选择 3 个职能：</span>
      <FunctionSelectField
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        maxLength={3}
        placeholder="请选择职能（最多3项）"
        style={{ width: 320 }}
      />
      <Tag color={value.length >= 3 ? 'red' : 'blue'}>
        已选择 {value.length}/3 项
      </Tag>
    </Flex>
  );
};

// 弹窗模式示例
const PopupModeExample = () => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>弹窗模式：</span>
      <FunctionSelectField
        value={value}
        onChange={setValue}
        isPopup={false}
        placeholder="点击打开弹窗选择"
        style={{ width: 320 }}
      />
      {value.length > 0 && (
        <div>已选：{value.map((item) => item.name).join('、')}</div>
      )}
    </Flex>
  );
};

const BaseExample = () => {
  const [isPopup, setIsPopup] = useState(true);

  return (
    <Flex vertical gap={24}>
      <Flex align="center" gap={12}>
        <span>展示模式：</span>
        <Switch
          checked={isPopup}
          onChange={setIsPopup}
          checkedChildren="下拉"
          unCheckedChildren="弹窗"
        />
        <span style={{ color: '#666', fontSize: 12 }}>
          {isPopup ? '点击输入框展开下拉菜单' : '点击输入框打开弹窗'}
        </span>
      </Flex>
      <Divider />
      <BasicMultiExample isPopup={isPopup} />
      <Divider />
      <SingleSelectExample isPopup={isPopup} />
      <Divider />
      <MaxLimitExample isPopup={isPopup} />
      <Divider />
      <PopupModeExample />
    </Flex>
  );
};

render(<BaseExample />);

```

- IndustrySelectField 行业选择器
- 基于级联选择器的行业选择组件，支持多级行业数据的选择，具备搜索、单选/多选等功能
- _SuperSelectPlus(@kne/current-lib_super-select-plus)[import * as _SuperSelectPlus from "@kne/super-select-plus"],antd(antd)

```jsx
const { IndustrySelectField } = _SuperSelectPlus;
const { Flex, Divider, Tag, Switch } = antd;
const { useState } = React;

// 基础多选示例
const BasicMultiExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>多选行业：</span>
      <IndustrySelectField
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择行业"
        style={{ width: 320 }}
      />
      {value.length > 0 && (
        <Flex wrap gap={4}>
          {value.map((item) => (
            <Tag key={item.id} color="blue">
              {item.name}
            </Tag>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

// 单选示例
const SingleSelectExample = ({ isPopup }) => {
  const [value, setValue] = useState(null);

  return (
    <Flex vertical gap={8}>
      <span>单选行业：</span>
      <IndustrySelectField
        single
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择行业"
        style={{ width: 320 }}
      />
      {value && <Tag color="green">已选：{value.name}</Tag>}
    </Flex>
  );
};

// 数量限制示例
const MaxLimitExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>最多选择 3 个行业：</span>
      <IndustrySelectField
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        maxLength={3}
        placeholder="请选择行业（最多3项）"
        style={{ width: 320 }}
      />
      <Tag color={value.length >= 3 ? 'red' : 'blue'}>
        已选择 {value.length}/3 项
      </Tag>
    </Flex>
  );
};

const BaseExample = () => {
  const [isPopup, setIsPopup] = useState(true);

  return (
    <Flex vertical gap={24}>
      <Flex align="center" gap={12}>
        <span>展示模式：</span>
        <Switch
          checked={isPopup}
          onChange={setIsPopup}
          checkedChildren="下拉"
          unCheckedChildren="弹窗"
        />
        <span style={{ color: '#666', fontSize: 12 }}>
          {isPopup ? '点击输入框展开下拉菜单' : '点击输入框打开弹窗'}
        </span>
      </Flex>
      <Divider />
      <BasicMultiExample isPopup={isPopup} />
      <Divider />
      <SingleSelectExample isPopup={isPopup} />
      <Divider />
      <MaxLimitExample isPopup={isPopup} />
    </Flex>
  );
};

render(<BaseExample />);

```

- AddressSelectField 城市选择器
- 城市地址选择组件，支持国内外城市搜索选择，具备拼音搜索、首字母搜索等功能
- _SuperSelectPlus(@kne/current-lib_super-select-plus)[import * as _SuperSelectPlus from "@kne/super-select-plus"],(@kne/current-lib_super-select-plus/dist/index.css),antd(antd)

```jsx
const { AddressSelectField } = _SuperSelectPlus;
const { Flex, Divider, Tag, Switch } = antd;
const { useState } = React;

// 基础多选示例
const BasicMultiExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>多选城市：</span>
      <AddressSelectField
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择城市"
        style={{ width: 320 }}
      />
      {value.length > 0 && (
        <Flex wrap gap={4}>
          {value.map((item) => (
            <Tag key={item.code} color="blue">
              {item.name}
            </Tag>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

// 单选示例
const SingleSelectExample = ({ isPopup }) => {
  const [value, setValue] = useState(null);

  return (
    <Flex vertical gap={8}>
      <span>单选城市：</span>
      <AddressSelectField
        single
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择城市"
        style={{ width: 320 }}
      />
      {value && <Tag color="green">已选：{value.name}</Tag>}
    </Flex>
  );
};

// 数量限制示例
const MaxLimitExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>最多选择 5 个城市：</span>
      <AddressSelectField
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        maxLength={5}
        placeholder="请选择城市（最多5项）"
        style={{ width: 320 }}
      />
      <Tag color={value.length >= 5 ? 'red' : 'blue'}>
        已选择 {value.length}/5 项
      </Tag>
    </Flex>
  );
};

// 弹窗模式示例
const PopupModeExample = () => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>弹窗模式：</span>
      <AddressSelectField
        value={value}
        onChange={setValue}
        isPopup={false}
        placeholder="点击打开弹窗选择"
        style={{ width: 320 }}
      />
      {value.length > 0 && (
        <div>已选：{value.map((item) => item.name).join('、')}</div>
      )}
    </Flex>
  );
};

const BaseExample = () => {
  const [isPopup, setIsPopup] = useState(true);

  return (
    <Flex vertical gap={24}>
      <Flex align="center" gap={12}>
        <span>展示模式：</span>
        <Switch
          checked={isPopup}
          onChange={setIsPopup}
          checkedChildren="下拉"
          unCheckedChildren="弹窗"
        />
        <span style={{ color: '#666', fontSize: 12 }}>
          {isPopup ? '点击输入框展开下拉菜单' : '点击输入框打开弹窗'}
        </span>
      </Flex>
      <Divider />
      <BasicMultiExample isPopup={isPopup} />
      <Divider />
      <SingleSelectExample isPopup={isPopup} />
      <Divider />
      <MaxLimitExample isPopup={isPopup} />
      <Divider />
      <PopupModeExample />
    </Flex>
  );
};

render(<BaseExample />);

```

### API

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
