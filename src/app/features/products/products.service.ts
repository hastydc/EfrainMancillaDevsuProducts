import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';
import { Product } from '../../models/product.interface';
import { devsuFormatDate } from '../../shared/utils';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl).pipe(
      map((response) =>
        response.map((product) => ({
          ...product,
          date_release: devsuFormatDate(new Date(product.date_release)),
          date_revision: devsuFormatDate(new Date(product.date_revision)),
        }))
      )
    );
  }

  get(baseId: string): Observable<Product | undefined> {
    return this.httpClient
      .get(this.apiUrl)
      .pipe(
        map((response) =>
          (response as Product[]).find(({ id }: Product) => id === baseId)
        )
      );
  }

  post(payload: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, payload);
  }

  put(payload: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.apiUrl, payload);
  }

  delete(id: string): Observable<string> {
    const url = `${this.apiUrl}?id=${id}`;

    return this.httpClient.delete<string>(url);
  }

  validate(id: string): Observable<boolean> {
    const url = `${this.apiUrl}/verification?id=${id}`;

    return this.httpClient.get<boolean>(url);
  }
}
