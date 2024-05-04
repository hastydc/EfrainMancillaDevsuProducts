import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const devsuInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedReq = req.clone({
    setHeaders: {
      authorId: environment.authId,
    },
  });

  return next(clonedReq);
};
