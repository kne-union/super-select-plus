import SelectFunction, { FunctionEnum } from './SelectFunction';
import SelectIndustry, { IndustryEnum } from './SelectIndustry';
import SelectAddress, { AddressEnum, createAddressApi } from './SelectAddress';
import EnumDisplay from './EnumDisplay';
import '@kne/super-select/dist/index.css';

// 导出组件
export { SelectFunction, SelectIndustry, SelectAddress, AddressEnum, createAddressApi, FunctionEnum, IndustryEnum, EnumDisplay };

// 默认导出
export default {
  SelectFunction,
  SelectIndustry,
  SelectAddress,
  AddressEnum,
  FunctionEnum,
  IndustryEnum,
  EnumDisplay
};
