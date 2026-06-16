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
            <div><strong>全部学历：</strong><EnumDisplay names={['3', '2', '1']} type="education" {...educationEnumApi} /></div>
          </div>
        </InfoPage.Part>

        <InfoPage.Part title="批量显示 names">
          <Flex vertical gap={12}>
            <p>默认渲染（label 数组 toString，逗号分隔）：</p>
            <p>学历编码 ['1', '2', '3']：<EnumDisplay names={['1', '2', '3']} type="education" {...educationEnumApi} /></p>
            <p>学历编码 ['1', '3']：<EnumDisplay names={['1', '3']} type="education" {...educationEnumApi} /></p>
            <p>空数组：<EnumDisplay names={[]} type="education" {...educationEnumApi} /></p>
          </Flex>
        </InfoPage.Part>

        <InfoPage.Part title="names 自定义渲染">
          <EnumDisplay names={['1', '2', '3']} type="education" {...educationEnumApi}>
            {(items, { labels, mapping, locale }) => (
              <Flex vertical gap={8}>
                <div>当前语言：{locale}</div>
                <div>labels：{labels.join(' / ')}</div>
                <Flex gap={8} wrap="wrap">
                  {items.map((item, index) => item && (
                    <span
                      key={item.code}
                      style={{ padding: '4px 8px', background: '#f0f5ff', borderRadius: '4px' }}
                    >
                      {item.label}
                      {mapping.get(item.code)?.enName && ` (${mapping.get(item.code).enName})`}
                    </span>
                  ))}
                </Flex>
              </Flex>
            )}
          </EnumDisplay>
        </InfoPage.Part>
        
        <InfoPage.Part title="错误处理">
          <Flex vertical gap={12}>
            <p>单个无效编码：</p>
            <EnumDisplay name="999" type="education" {...educationEnumApi}>
              {(item) => <span>{item ? item.label : '未知学历'}</span>}
            </EnumDisplay>
            <p>批量含无效编码（默认跳过无效项）：</p>
            <EnumDisplay names={['1', '999', '3']} type="education" {...educationEnumApi} />
            <p>批量含无效编码（自定义处理）：</p>
            <EnumDisplay names={['1', '999', '3']} type="education" {...educationEnumApi}>
              {(items, { labels }) => (
                <span>
                  {items.map((item, index) => (
                    <span key={index}>
                      {index > 0 && '、'}
                      {item ? item.label : '未知'}
                    </span>
                  ))}
                </span>
              )}
            </EnumDisplay>
          </Flex>
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

render(<BaseExample />);
