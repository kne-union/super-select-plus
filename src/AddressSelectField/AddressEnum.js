import { useMemo } from 'react';
import { useIntl } from '@kne/react-intl';
import get from 'lodash/get';
import { createAddressApi } from './Address';

const AddressEnum = ({ name, data, displayParent, children }) => {
  const { locale } = useIntl();
  const addressApi = useMemo(() => createAddressApi(data), [data]);

  const cityData = addressApi.getCity(name);
  const { city, parent } = cityData;

  const getLabelForLocal = (item, locale) => {
    if (locale === 'en-US') {
      return get(item, 'enName') || get(item, 'name');
    }
    return get(item, 'name');
  };

  if (children) {
    return children(cityData, { displayParent, locale, getLabelForLocal });
  }

  if (displayParent) {
    return parent ? `${getLabelForLocal(parent, locale)}·${getLabelForLocal(city, locale)}` : getLabelForLocal(city, locale);
  }
  return getLabelForLocal(city, locale);
};

AddressEnum.defaultProps = {
  displayParent: false
};

export default AddressEnum;
