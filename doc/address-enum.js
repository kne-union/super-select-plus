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
