import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products.component').then(
        (c) => c.ProductsComponent
      ),
  },
  {
    path: 'products',
    children: [
      {
        path: 'add',
        data: {
          isAdd: true,
        },
        loadComponent: () =>
          import(
            './features/products/products-form/products-form.component'
          ).then((c) => c.ProductsFormComponent),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import(
            './features/products/products-form/products-form.component'
          ).then((c) => c.ProductsFormComponent),
      },
    ],
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products', pathMatch: 'full' },
];
