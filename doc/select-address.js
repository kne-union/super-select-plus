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
