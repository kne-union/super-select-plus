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
