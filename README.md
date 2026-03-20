# super-select-plus

### 安装

```shell
npm i --save @kne/super-select-plus
```

### 概述

`@kne/super-select-plus` 是一个基于 `@kne/super-select` 封装的 React
业务选择器组件库，提供职能、行业、城市等常见业务场景的选择器组件和枚举值显示组件。所有组件均支持国际化、拼音搜索、单选/多选等功能，枚举显示组件使用
`react-fetch` 统一管理数据加载和缓存。

### 主要特性

- **丰富的业务选择器**：提供职能选择器、行业选择器、城市选择器三大核心组件
- **枚举值显示组件**：提供地址、职能、行业等枚举值的统一显示组件
- **级联选择支持**：职能和行业选择器基于级联选择器实现，支持多级数据选择
- **智能搜索**：支持中英文搜索、拼音搜索、首字母搜索
- **国际化支持**：内置中英文切换，可根据语言环境自动切换显示内容
- **灵活的展示模式**：支持下拉菜单和弹窗两种展示模式
- **数量限制**：支持设置最大选择数量
- **单选/多选**：所有组件均支持单选和多选模式
- **数据缓存**：枚举显示组件内置多层缓存机制，提升性能
- **自定义渲染**：枚举显示组件支持自定义渲染函数，灵活展示

### 组件列表

| 组件名称           | 功能描述              |
|----------------|-------------------|
| SelectFunction | 职能选择器，支持多级职能数据选择  |
| SelectIndustry | 行业选择器，支持多级行业数据选择  |
| SelectAddress  | 城市选择器，支持国内外城市搜索选择 |
| AddressEnum    | 地址枚举显示，用于显示城市名称   |
| FunctionEnum   | 职能枚举显示，用于显示职能名称   |
| IndustryEnum   | 行业枚举显示，用于显示行业名称   | 
| EnumDisplay    | 通用枚举显示，支持自定义数据源   |

### 数据来源

组件内置了丰富的业务数据：

- **职能数据**：包含完整的职位职能分类，支持三级职能体系
- **行业数据**：覆盖主要行业分类，支持多级行业结构
- **城市数据**：包含国内外主要城市，支持按省份、国家分类

所有数据支持中英文双语，可通过组件的静态方法获取原始数据进行自定义处理。


### 示例

#### 示例代码

- SelectFunction 职能选择器
- 基于级联选择器的职能选择组件，支持多级职能数据的选择，具备搜索、单选/多选等功能
- _SuperSelectPlus(@kne/current-lib_super-select-plus)[import * as _SuperSelectPlus from "@kne/super-select-plus"],antd(antd)

```jsx
const { SelectFunction } = _SuperSelectPlus;
const { Flex, Divider, Tag, Switch } = antd;
const { useState } = React;

// 基础多选示例
const BasicMultiExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>多选职能：</span>
      <SelectFunction
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
      <SelectFunction
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
      <SelectFunction
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
      <SelectFunction
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

- SelectIndustry 行业选择器
- 基于级联选择器的行业选择组件，支持多级行业数据的选择，具备搜索、单选/多选等功能
- _SuperSelectPlus(@kne/current-lib_super-select-plus)[import * as _SuperSelectPlus from "@kne/super-select-plus"],antd(antd)

```jsx
const { SelectIndustry } = _SuperSelectPlus;
const { Flex, Divider, Tag, Switch } = antd;
const { useState } = React;

// 基础多选示例
const BasicMultiExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>多选行业：</span>
      <SelectIndustry
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
      <SelectIndustry
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
      <SelectIndustry
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

- SelectAddress 城市选择器
- 城市地址选择组件，支持国内外城市搜索选择，具备拼音搜索、首字母搜索等功能
- _SuperSelectPlus(@kne/current-lib_super-select-plus)[import * as _SuperSelectPlus from "@kne/super-select-plus"],(@kne/current-lib_super-select-plus/dist/index.css),antd(antd)

```jsx
const { SelectAddress } = _SuperSelectPlus;
const { Flex, Divider, Tag, Switch } = antd;
const { useState } = React;

// 基础多选示例
const BasicMultiExample = ({ isPopup }) => {
  const [value, setValue] = useState([]);

  return (
    <Flex vertical gap={8}>
      <span>多选城市：</span>
      <SelectAddress
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
      <SelectAddress
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
      <SelectAddress
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

- AddressEnum 地址枚举显示
- 用于显示城市名称的枚举组件，支持国际化、显示父级、自定义渲染等功能
- _SuperSelectPlus(@kne/current-lib_super-select-plus)[import * as _SuperSelectPlus from "@kne/super-select-plus"],antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { AddressEnum } = _SuperSelectPlus;
const { createWithRemoteLoader } = remoteLoader;
const { Flex } = antd;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  
  return (
    <PureGlobal preset={{
      ajax: async api => {
        return { data: { code: 0, data: await api.loader() } };
      },
      apis: {
        cityData: {
          loader: async () => {
            const module = await import('@kne/super-select-plus/src/SelectAddress/city.json');
            return module.default || module;
          }
        }
      }
    }}>
      <InfoPage>
        <InfoPage.Part title="基本用法">
          <Flex vertical gap={12}>
            <p>北京（编码：010）：<AddressEnum name="010" /></p>
            <p>上海（编码：020）：<AddressEnum name="020" /></p>
            <p>广州（编码：050020）：<AddressEnum name="050020" /></p>
            <p>深圳（编码：050090）：<AddressEnum name="050090" /></p>
          </Flex>
        </InfoPage.Part>
        
        <InfoPage.Part title="自定义渲染">
          <Flex vertical gap={12}>
            <p>带样式渲染：</p>
            <AddressEnum name="010">
              {({ city, parent }, { getLabelForLocal, locale }) => city && (
                <span style={{ padding: '4px 8px', background: '#f0f0f0', borderRadius: '4px' }}>
                  {getLabelForLocal(city, locale)}
                  {parent && <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>({getLabelForLocal(parent, locale)})</span>}
                </span>
              )}
            </AddressEnum>
            
            <p>带图标显示：</p>
            <AddressEnum name="020">
              {({ city }, { getLabelForLocal, locale }) => city && (
                <span>📍 {getLabelForLocal(city, locale)}</span>
              )}
            </AddressEnum>
          </Flex>
        </InfoPage.Part>
        
        <InfoPage.Part title="实际业务场景">
          <div style={{ lineHeight: '32px' }}>
            <div><strong>姓名：</strong>张三</div>
            <div><strong>所在城市：</strong><AddressEnum name="010" /></div>
            <div><strong>期望工作城市：</strong><AddressEnum name="020" /></div>
          </div>
        </InfoPage.Part>
        
        <InfoPage.Part title="错误处理">
          <p>不存在的城市编码 999999：<AddressEnum name="999999" /></p>
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

render(<BaseExample />);

```

- FunctionEnum 职能枚举显示
- 用于显示职能名称的枚举组件，支持国际化、自定义渲染等功能
- _SuperSelectPlus(@kne/current-lib_super-select-plus)[import * as _SuperSelectPlus from "@kne/super-select-plus"],antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { FunctionEnum } = _SuperSelectPlus;
const { createWithRemoteLoader } = remoteLoader;
const { Flex } = antd;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  
  return (
    <PureGlobal preset={{
      ajax: async api => {
        return { data: { code: 0, data: await api.loader() } };
      },
      apis: {
        functionData: {
          loader: async () => {
            const module = await import('@kne/super-select-plus/src/SelectFunction/function.json');
            return module.default || module;
          }
        }
      }
    }}>
      <InfoPage>
        <InfoPage.Part title="基本用法">
          <Flex vertical gap={12}>
            <p>CEO（编码：001001001）：<FunctionEnum name="001001001" /></p>
            <p>副总裁（编码：001001002）：<FunctionEnum name="001001002" /></p>
            <p>COO（编码：001001003）：<FunctionEnum name="001001003" /></p>
          </Flex>
        </InfoPage.Part>
        
        <InfoPage.Part title="自定义渲染">
          <Flex vertical gap={12}>
            <p>带样式渲染：</p>
            <FunctionEnum name="001001001">
              {(item, { locale }) => item && (
                <span style={{ padding: '4px 8px', background: '#e6f7ff', borderRadius: '4px' }}>
                  {item.label}
                  {item.enName && <span style={{ marginLeft: '8px', color: '#666' }}>({item.enName})</span>}
                </span>
              )}
            </FunctionEnum>
            
            <p>带层级显示：</p>
            <FunctionEnum name="001001002">
              {(item, { mapping }) => {
                if (!item) return null;
                const parent = item.parentId ? mapping.get(item.parentId) : null;
                return (
                  <div>
                    {parent && <span style={{ fontSize: '12px', color: '#999' }}>{parent.label} &gt; </span>}
                    <span style={{ color: '#1890ff' }}>{item.label}</span>
                  </div>
                );
              }}
            </FunctionEnum>
          </Flex>
        </InfoPage.Part>
        
        <InfoPage.Part title="实际业务场景">
          <div style={{ lineHeight: '32px' }}>
            <div><strong>姓名：</strong>李四</div>
            <div><strong>当前职能：</strong><FunctionEnum name="001001001" /></div>
            <div><strong>期望职能：</strong><FunctionEnum name="001001002" /></div>
          </div>
        </InfoPage.Part>
        
        <InfoPage.Part title="国际化支持">
          <FunctionEnum name="001001003">
            {(item, { locale }) => item && (
              <div>
                <div>当前语言：{locale}</div>
                <div>显示名称：{item.label}</div>
                {item.chName && <div>中文名：{item.chName}</div>}
                {item.enName && <div>英文名：{item.enName}</div>}
              </div>
            )}
          </FunctionEnum>
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

render(<BaseExample />);

```

- IndustryEnum 行业枚举显示
- 用于显示行业名称的枚举组件，支持国际化、自定义渲染等功能
- _SuperSelectPlus(@kne/current-lib_super-select-plus)[import * as _SuperSelectPlus from "@kne/super-select-plus"],antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { IndustryEnum } = _SuperSelectPlus;
const { createWithRemoteLoader } = remoteLoader;
const { Flex } = antd;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  
  return (
    <PureGlobal preset={{
      ajax: async api => {
        return { data: { code: 0, data: await api.loader() } };
      },
      apis: {
        industryData: {
          loader: async () => {
            const module = await import('@kne/super-select-plus/src/SelectIndustry/industry.json');
            return module.default || module;
          }
        }
      }
    }}>
      <InfoPage>
        <InfoPage.Part title="基本用法">
          <Flex vertical gap={12}>
            <p>互联网/电子通信/软件（编码：001）：<IndustryEnum name="001" /></p>
            <p>房地产/建筑/物业（编码：003）：<IndustryEnum name="003" /></p>
            <p>金融（编码：004）：<IndustryEnum name="004" /></p>
          </Flex>
        </InfoPage.Part>
        
        <InfoPage.Part title="自定义渲染">
          <Flex vertical gap={12}>
            <p>带样式渲染：</p>
            <IndustryEnum name="001">
              {(item, { locale }) => item && (
                <span style={{ padding: '4px 8px', background: '#f6ffed', borderRadius: '4px' }}>
                  {item.label}
                  {item.enName && <span style={{ marginLeft: '8px', color: '#666' }}>({item.enName})</span>}
                </span>
              )}
            </IndustryEnum>
          </Flex>
        </InfoPage.Part>
        
        <InfoPage.Part title="实际业务场景">
          <div style={{ lineHeight: '32px' }}>
            <div><strong>企业名称：</strong>某某科技有限公司</div>
            <div><strong>所属行业：</strong><IndustryEnum name="001" /></div>
            <div><strong>期望行业：</strong><IndustryEnum name="004" /></div>
          </div>
        </InfoPage.Part>
        
        <InfoPage.Part title="行业标签展示">
          <Flex gap={8}>
            <IndustryEnum name="001">
              {(item) => item && <span style={{ padding: '4px 8px', background: '#e6f7ff', borderRadius: '4px' }}>{item.label}</span>}
            </IndustryEnum>
            <IndustryEnum name="003">
              {(item) => item && <span style={{ padding: '4px 8px', background: '#f6ffed', borderRadius: '4px' }}>{item.label}</span>}
            </IndustryEnum>
            <IndustryEnum name="004">
              {(item) => item && <span style={{ padding: '4px 8px', background: '#fff7e6', borderRadius: '4px' }}>{item.label}</span>}
            </IndustryEnum>
          </Flex>
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

render(<BaseExample />);

```

- EnumDisplay 通用枚举显示
- 通用枚举显示组件，支持自定义数据源、国际化、缓存等功能
- _SuperSelectPlus(@kne/current-lib_super-select-plus)[import * as _SuperSelectPlus from "@kne/super-select-plus"],antd(antd),remoteLoader(@kne/remote-loader)

```jsx
const { EnumDisplay } = _SuperSelectPlus;
const { createWithRemoteLoader } = remoteLoader;
const { Flex } = antd;

const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal', 'components-core:InfoPage']
})(({ remoteModules }) => {
  const [PureGlobal, InfoPage] = remoteModules;
  
  // 自定义枚举数据示例
  const customEnumData = [
    { code: '1', name: '本科', enName: 'Bachelor' },
    { code: '2', name: '硕士', enName: 'Master' },
    { code: '3', name: '博士', enName: 'Doctor' }
  ];
  
  // 学历枚举配置
  const educationEnumApi = {
    cache: 'EDUCATION_DATA',
    isLocal: true,
    loader: async () => customEnumData
  };
  
  return (
    <PureGlobal preset={{
      ajax: async api => {
        return { data: { code: 0, data: await api.loader() } };
      }
    }}>
      <InfoPage>
        <InfoPage.Part title="基本用法">
          <Flex vertical gap={12}>
            <p>学历 - 本科（编码：1）：<EnumDisplay name="1" type="education" {...educationEnumApi} /></p>
            <p>学历 - 硕士（编码：2）：<EnumDisplay name="2" type="education" {...educationEnumApi} /></p>
            <p>学历 - 博士（编码：3）：<EnumDisplay name="3" type="education" {...educationEnumApi} /></p>
          </Flex>
        </InfoPage.Part>
        
        <InfoPage.Part title="自定义 getLabel 函数">
          <EnumDisplay
            name="1"
            type="education"
            {...educationEnumApi}
            getLabel={(item, locale) => locale === 'en-US' ? (item.enName || item.name) : item.name}
          >
            {(item, { locale }) => item && (
              <div>
                <div>当前语言：{locale}</div>
                <div>显示名称：{item.label}</div>
              </div>
            )}
          </EnumDisplay>
        </InfoPage.Part>
        
        <InfoPage.Part title="自定义渲染">
          <EnumDisplay name="2" type="education" {...educationEnumApi}>
            {(item) => item && (
              <span style={{ padding: '4px 8px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '4px', color: '#fff' }}>
                {item.name} {item.enName && &#96;(${item.enName})&#96;}
              </span>
            )}
          </EnumDisplay>
        </InfoPage.Part>
        
        <InfoPage.Part title="实际业务场景">
          <div style={{ lineHeight: '32px' }}>
            <div><strong>姓名：</strong>赵六</div>
            <div><strong>最高学历：</strong><EnumDisplay name="3" type="education" {...educationEnumApi} /></div>
            <div><strong>第二学历：</strong><EnumDisplay name="2" type="education" {...educationEnumApi} /></div>
          </div>
        </InfoPage.Part>
        
        <InfoPage.Part title="错误处理">
          <EnumDisplay name="999" type="education" {...educationEnumApi}>
            {(item) => <span>{item ? item.label : '未知学历'}</span>}
          </EnumDisplay>
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

render(<BaseExample />);

```

### API

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
| name | string | - | 职能编码，必需 |
| force | boolean | false | 是否强制刷新缓存 |
| children | function | - | 自定义渲染函数 |
| api | object | - | 自定义 API 配置 |

#### 自定义渲染函数

```javascript
children={(item, { locale, mapping }) => {
  // item: 职能数据对象，包含 label, chName, enName 等
  // locale: 当前语言环境
  // mapping: 所有职能数据的 Map 对象
  return <span>{item.label}</span>;
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

// 自定义渲染
<FunctionEnum name="001001001">
  {(item, { locale }) => (
    <div>
      <span>{item.label}</span>
      {item.enName && <span>({item.enName})</span>}
    </div>
  )}
</FunctionEnum>
```

---

### IndustryEnum 行业枚举显示组件

用于显示行业名称的枚举组件，使用 `react-fetch` 加载数据，支持缓存和国际化。

#### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|-------|------|
| name | string | - | 行业编码，必需 |
| force | boolean | false | 是否强制刷新缓存 |
| children | function | - | 自定义渲染函数 |
| api | object | - | 自定义 API 配置 |

#### 自定义渲染函数

```javascript
children={(item, { locale, mapping }) => {
  // item: 行业数据对象，包含 label, chName, enName 等
  // locale: 当前语言环境
  // mapping: 所有行业数据的 Map 对象
  return <span>{item.label}</span>;
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

// 自定义渲染
<IndustryEnum name="001">
  {(item, { locale }) => (
    <div>
      <span>{item.label}</span>
      {item.enName && <span>({item.enName})</span>}
    </div>
  )}
</IndustryEnum>
```

---

### EnumDisplay 通用枚举显示组件

通用的枚举显示组件，支持自定义数据源、国际化、缓存等功能。

#### 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|-------|------|
| name | string | - | 枚举值编码，必需 |
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
children={(item, { locale, mapping }) => {
  // item: 枚举数据对象
  // locale: 当前语言环境
  // mapping: 所有枚举数据的 Map 对象
  return <span>{item.label}</span>;
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

// 自定义 getLabel
<EnumDisplay
  name="1"
  type="education"
  api={api}
  getLabel={(item, locale) => {
    return locale === 'en-US' ? item.enName : item.name;
  }}
/>
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
