import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { devsuInterceptor } from './devsu.interceptor';

describe('devsuInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => devsuInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('devsuInterceptor', () => {
    const response = devsuInterceptor(
      { clone: () => {} } as any,
      (v) => ({}) as any
    );

    expect(response).toBeDefined();
  });
});
