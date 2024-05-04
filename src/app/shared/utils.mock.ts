import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.interface';

export class TranslateLoaderMock extends TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of('');
  }
}

export const TranslateModuleMock = TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useClass: TranslateLoaderMock,
  },
});

export const defaultProduct: Product = {
  id: '1',
  name: '2',
  description: '3',
  logo: '4',
  date_release: '2025-12-02T00:00:00.000+00:00',
  date_revision: '2026-12-02T00:00:00.000+00:00',
};

export const defaultProductDates: Product = {
  ...defaultProduct,
  date_release: '02/12/2025',
  date_revision: '02/12/2026',
};
