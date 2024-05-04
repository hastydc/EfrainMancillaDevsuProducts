import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ProductFormKey } from './productFormKey.enum';

export interface Product {
  [ProductFormKey.ID]: string;
  [ProductFormKey.NAME]: string;
  [ProductFormKey.DESCRIPTION]: string;
  [ProductFormKey.LOGO]: string;
  [ProductFormKey.RELEASE_DATE]: string;
  [ProductFormKey.RESTRUCTURING_DATE]: string;
}

export interface ProductForm {
  [ProductFormKey.ID]: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  [ProductFormKey.NAME]: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  [ProductFormKey.DESCRIPTION]: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  [ProductFormKey.LOGO]: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  [ProductFormKey.RELEASE_DATE]: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
  [ProductFormKey.RESTRUCTURING_DATE]: (
    | string
    | ((control: AbstractControl<any, any>) => ValidationErrors | null)[]
  )[];
}
