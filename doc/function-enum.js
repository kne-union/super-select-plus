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
