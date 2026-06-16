const { SelectFunction, FunctionEnum, enumItemsToSelectValue, enumItemToSelectValue } = _SuperSelectPlus;
const { Flex, Divider, Tag, Switch } = antd;
const { useState } = React;

// 模拟后端接口返回的职能编码
const savedFunctionCodes = ['001001001', '001001002', '001001003'];
const savedFunctionCode = '001001001';

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

// 值回显 - 仅传 id，组件自动从 options 解析名称
const ValueEchoByIdExample = ({ isPopup }) => {
  const [value, setValue] = useState(savedFunctionCodes.map((id) => ({ id })));

  return (
    <Flex vertical gap={8}>
      <span>值回显（仅编码 {`{ id }`}）：</span>
      <Tag color="default">后端编码：{savedFunctionCodes.join('、')}</Tag>
      <SelectFunction
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择职能"
        style={{ width: 320 }}
      />
    </Flex>
  );
};

// 值回显 - 仅传编码字符串数组
const ValueEchoByCodesExample = ({ isPopup }) => {
  const [value, setValue] = useState(savedFunctionCodes);

  return (
    <Flex vertical gap={8}>
      <span>值回显（编码字符串数组）：</span>
      <Tag color="default">后端编码：{savedFunctionCodes.join('、')}</Tag>
      <SelectFunction
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择职能"
        style={{ width: 320 }}
      />
    </Flex>
  );
};

// 值回显 - 单选（对象编码）
const SingleValueEchoExample = ({ isPopup }) => {
  const [value, setValue] = useState({ id: '001001001' });

  return (
    <Flex vertical gap={8}>
      <span>单选值回显（{`{ id: '001001001' }`}）：</span>
      <SelectFunction
        single
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择职能"
        style={{ width: 320 }}
      />
    </Flex>
  );
};

// 值回显 - 单选（字符串编码）
const SingleValueEchoByCodeExample = ({ isPopup }) => {
  const [value, setValue] = useState(savedFunctionCode);

  return (
    <Flex vertical gap={8}>
      <span>单选值回显（编码字符串）：</span>
      <SelectFunction
        single
        value={value}
        onChange={setValue}
        isPopup={isPopup}
        placeholder="请选择职能"
        style={{ width: 320 }}
      />
    </Flex>
  );
};

// 值回显 - 单选（FunctionEnum name）
const SingleValueEchoWithEnumExample = ({ isPopup }) => {
  const [value, setValue] = useState();

  return (
    <Flex vertical gap={8}>
      <span>单选值回显（FunctionEnum name）：</span>
      <Tag color="default">后端编码：{savedFunctionCode}</Tag>
      <FunctionEnum name={savedFunctionCode}>
        {(item) => {
          const resolved = enumItemToSelectValue(item);
          if (!resolved) return <span>加载中...</span>;
          return (
            <SelectFunction
              single
              value={value ?? resolved}
              onChange={setValue}
              isPopup={isPopup}
              placeholder="请选择职能"
              style={{ width: 320 }}
            />
          );
        }}
      </FunctionEnum>
    </Flex>
  );
};

// 值回显 - 结合 FunctionEnum，仅传编码数组 names={[code, code]}
const ValueEchoWithEnumExample = ({ isPopup }) => {
  const [value, setValue] = useState();

  return (
    <Flex vertical gap={8}>
      <span>值回显（FunctionEnum names）：</span>
      <Tag color="default">后端编码：{savedFunctionCodes.join('、')}</Tag>
      <FunctionEnum names={savedFunctionCodes}>
        {(items) => {
          const resolved = enumItemsToSelectValue(items);
          if (!resolved.length) return <span>加载中...</span>;
          return (
            <SelectFunction
              value={value ?? resolved}
              onChange={setValue}
              isPopup={isPopup}
              placeholder="请选择职能"
              style={{ width: 320 }}
            />
          );
        }}
      </FunctionEnum>
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
      <Divider />
      <PopupModeExample />
    </Flex>
  );
};

render(<BaseExample />);
