const { SelectIndustry, IndustryEnum, enumItemsToSelectValue, enumItemToSelectValue } = _SuperSelectPlus;
const { Flex, Divider, Tag, Switch } = antd;
const { useState } = React;

// 模拟后端接口返回的行业编码
const savedIndustryCodes = ['001', '003', '004'];
const savedIndustryCode = '001';

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

// 值回显 - 仅传 id，组件自动从 options 解析名称
const ValueEchoByIdExample = ({ isPopup }) => {
  const [value, setValue] = useState(savedIndustryCodes.map((id) => ({ id })));

  return (
    <Flex vertical gap={8}>
      <span>值回显（仅编码 {`{ id }`}）：</span>
      <Tag color="default">后端编码：{savedIndustryCodes.join('、')}</Tag>
      <SelectIndustry
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择行业"
        style={{ width: 320 }}
      />
    </Flex>
  );
};

// 值回显 - 仅传编码字符串数组
const ValueEchoByCodesExample = ({ isPopup }) => {
  const [value, setValue] = useState(savedIndustryCodes);

  return (
    <Flex vertical gap={8}>
      <span>值回显（编码字符串数组）：</span>
      <Tag color="default">后端编码：{savedIndustryCodes.join('、')}</Tag>
      <SelectIndustry
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择行业"
        style={{ width: 320 }}
      />
    </Flex>
  );
};

// 值回显 - 单选（对象编码）
const SingleValueEchoExample = ({ isPopup }) => {
  const [value, setValue] = useState({ id: '001' });

  return (
    <Flex vertical gap={8}>
      <span>单选值回显（{`{ id: '001' }`}）：</span>
      <SelectIndustry
        single
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择行业"
        style={{ width: 320 }}
      />
    </Flex>
  );
};

// 值回显 - 单选（字符串编码）
const SingleValueEchoByCodeExample = ({ isPopup }) => {
  const [value, setValue] = useState(savedIndustryCode);

  return (
    <Flex vertical gap={8}>
      <span>单选值回显（编码字符串）：</span>
      <SelectIndustry
        single
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择行业"
        style={{ width: 320 }}
      />
    </Flex>
  );
};

// 值回显 - 单选（IndustryEnum name）
const SingleValueEchoWithEnumExample = ({ isPopup }) => {
  const [value, setValue] = useState();

  return (
    <Flex vertical gap={8}>
      <span>单选值回显（IndustryEnum name）：</span>
      <Tag color="default">后端编码：{savedIndustryCode}</Tag>
      <IndustryEnum name={savedIndustryCode}>
        {(item) => {
          const resolved = enumItemToSelectValue(item);
          if (!resolved) return <span>加载中...</span>;
          return (
            <SelectIndustry
              single
              value={value ?? resolved}
              onChange={setValue}
              isPopup={isPopup}
              placeholder="请选择行业"
              style={{ width: 320 }}
            />
          );
        }}
      </IndustryEnum>
    </Flex>
  );
};

// 值回显 - 结合 IndustryEnum，仅传编码数组 names={[code, code]}
const ValueEchoWithEnumExample = ({ isPopup }) => {
  const [value, setValue] = useState();

  return (
    <Flex vertical gap={8}>
      <span>值回显（IndustryEnum names）：</span>
      <Tag color="default">后端编码：{savedIndustryCodes.join('、')}</Tag>
      <IndustryEnum names={savedIndustryCodes}>
        {(items) => {
          const resolved = enumItemsToSelectValue(items);
          if (!resolved.length) return <span>加载中...</span>;
          return (
            <SelectIndustry
              value={value ?? resolved}
              onChange={setValue}
              isPopup={isPopup}
              placeholder="请选择行业"
              style={{ width: 320 }}
            />
          );
        }}
      </IndustryEnum>
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
      <span style={{ fontWeight: 500 }}>单选值回显</span>
      <SingleValueEchoExample isPopup={isPopup} />
      <Divider />
      <SingleValueEchoByCodeExample isPopup={isPopup} />
      <Divider />
      <SingleValueEchoWithEnumExample isPopup={isPopup} />
      <Divider />
      <span style={{ fontWeight: 500 }}>多选值回显</span>
      <ValueEchoByIdExample isPopup={isPopup} />
      <Divider />
      <ValueEchoByCodesExample isPopup={isPopup} />
      <Divider />
      <ValueEchoWithEnumExample isPopup={isPopup} />
    </Flex>
  );
};

render(<BaseExample />);
