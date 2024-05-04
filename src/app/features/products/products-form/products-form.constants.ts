import { InputData } from '../../../models/inputData.interface';
import { InputType } from '../../../models/inputType.enum';
import { ProductFormKey } from '../../../models/productFormKey.enum';

export const getInputs = (): InputData[] => [
  {
    key: ProductFormKey.ID,
    label: 'id',
  },
  {
    key: ProductFormKey.NAME,
    label: 'name',
  },
  {
    key: ProductFormKey.DESCRIPTION,
    label: 'description',
  },
  {
    key: ProductFormKey.LOGO,
    label: 'logo',
  },
  {
    key: ProductFormKey.RELEASE_DATE,
    label: 'releaseDate',
    inputType: InputType.DATE,
  },
  {
    key: ProductFormKey.RESTRUCTURING_DATE,
    label: 'restructuringDate',
    inputType: InputType.DATE,
  },
];
