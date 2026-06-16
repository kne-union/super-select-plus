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
          <Flex gap={8} wrap="wrap">
            <IndustryEnum names={['001', '003', '004']}>
              {(items, { labels }) => labels.map(label => (
                <span key={label} style={{ padding: '4px 8px', background: '#e6f7ff', borderRadius: '4px' }}>
                  {label}
                </span>
              ))}
            </IndustryEnum>
          </Flex>
        </InfoPage.Part>

        <InfoPage.Part title="批量显示 names">
          <Flex vertical gap={12}>
            <p>默认渲染（逗号分隔）：<IndustryEnum names={['001', '003', '004']} /></p>
            <IndustryEnum names={['001', '004']}>
              {(items, { labels, locale }) => (
                <div>
                  <div style={{ marginBottom: 8 }}>当前语言：{locale}</div>
                  <div>{labels.join(' · ')}</div>
                </div>
              )}
            </IndustryEnum>
          </Flex>
        </InfoPage.Part>
      </InfoPage>
    </PureGlobal>
  );
});

render(<BaseExample />);
