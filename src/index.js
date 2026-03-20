import FunctionSelectField from './FunctionSelectField';
import IndustrySelectField from './IndustrySelectField';
import AddressSelectField, { AddressEnum, createAddressApi, getLabelForLocal } from './AddressSelectField';
import '@kne/super-select/dist/index.css';

// 导出组件
export { FunctionSelectField, IndustrySelectField, AddressSelectField, AddressEnum, createAddressApi, getLabelForLocal };

// 默认导出
export default {
  FunctionSelectField,
  IndustrySelectField,
  AddressSelectField,
  AddressEnum
};
