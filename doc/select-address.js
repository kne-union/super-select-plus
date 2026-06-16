const { SelectAddress, AddressEnum, addressEnumToSelectValue, addressEnumToSelectValueSingle } = _SuperSelectPlus;
const { Flex, Divider, Tag, Switch } = antd;
const { useState } = React;

// 模拟后端接口返回的城市编码
const savedCityCodes = ['010', '020'];
const savedCityCode = '010';

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

// 值回显 - 仅传 value 编码，组件自动解析 label
const ValueEchoByCodeExample = ({ isPopup }) => {
  const [value, setValue] = useState(savedCityCodes.map((code) => ({ value: code })));

  return (
    <Flex vertical gap={8}>
      <span>值回显（仅编码 {`{ value }`}）：</span>
      <Tag color="default">后端编码：{savedCityCodes.join('、')}</Tag>
      <SelectAddress
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择城市"
        style={{ width: 320 }}
      />
    </Flex>
  );
};

// 值回显 - 完整对象（表单已缓存 label）
const cachedCityValue = [
  { value: '010', label: '北京' },
  { value: '020', label: '上海' }
];

const ValueEchoWithLabelExample = ({ isPopup }) => {
  const [value, setValue] = useState(cachedCityValue);

  return (
    <Flex vertical gap={8}>
      <span>值回显（含 label）：</span>
      <Tag color="default">后端编码：{savedCityCodes.join('、')}</Tag>
      <SelectAddress
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择城市"
        style={{ width: 320 }}
      />
    </Flex>
  );
};

// 值回显 - 结合 AddressEnum，仅传编码数组 names={[code, code]}
const ValueEchoWithEnumExample = ({ isPopup }) => {
  const [value, setValue] = useState();

  return (
    <Flex vertical gap={8}>
      <span>值回显（AddressEnum names）：</span>
      <Tag color="default">后端编码：{savedCityCodes.join('、')}</Tag>
      <AddressEnum names={savedCityCodes}>
        {(outputs) => {
          const resolved = addressEnumToSelectValue(outputs);
          if (!resolved.length) return <span>加载中...</span>;
          return (
            <SelectAddress
              value={value ?? resolved}
              onChange={setValue}
              isPopup={isPopup}
              placeholder="请选择城市"
              style={{ width: 320 }}
            />
          );
        }}
      </AddressEnum>
    </Flex>
  );
};

// 值回显 - 单选（仅编码）
const SingleValueEchoExample = ({ isPopup }) => {
  const [value, setValue] = useState({ value: '010' });

  return (
    <Flex vertical gap={8}>
      <span>单选值回显（{`{ value: '010' }`}）：</span>
      <SelectAddress
        single
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择城市"
        style={{ width: 320 }}
      />
    </Flex>
  );
};

// 值回显 - 单选（字符串编码）
const SingleValueEchoByCodeExample = ({ isPopup }) => {
  const [value, setValue] = useState(savedCityCode);

  return (
    <Flex vertical gap={8}>
      <span>单选值回显（编码字符串）：</span>
      <SelectAddress
        single
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择城市"
        style={{ width: 320 }}
      />
    </Flex>
  );
};

// 值回显 - 单选（AddressEnum name）
const SingleValueEchoWithEnumExample = ({ isPopup }) => {
  const [value, setValue] = useState();

  return (
    <Flex vertical gap={8}>
      <span>单选值回显（AddressEnum name）：</span>
      <Tag color="default">后端编码：{savedCityCode}</Tag>
      <AddressEnum name={savedCityCode}>
        {(output) => {
          const resolved = addressEnumToSelectValueSingle(output);
          if (!resolved) return <span>加载中...</span>;
          return (
            <SelectAddress
              single
              value={value ?? resolved}
              onChange={setValue}
              isPopup={isPopup}
              placeholder="请选择城市"
              style={{ width: 320 }}
            />
          );
        }}
      </AddressEnum>
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
      <ValueEchoByCodeExample isPopup={isPopup} />
      <Divider />
      <ValueEchoWithLabelExample isPopup={isPopup} />
      <Divider />
      <ValueEchoWithEnumExample isPopup={isPopup} />
    </Flex>
  );
};

render(<BaseExample />);
