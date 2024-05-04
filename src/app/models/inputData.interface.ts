import { InputType } from './inputType.enum';
import { ProductFormKey } from './productFormKey.enum';

export interface InputData {
  key: ProductFormKey;
  label: string;
  inputType?: InputType;
}
