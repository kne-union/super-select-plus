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
                {item.name} {item.enName && `(${item.enName})`}
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
