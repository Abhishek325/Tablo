import { environment } from './../environments/environment';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class AppRequestInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const requestUrl = `${environment.apiEndpoint}${request.url}`;
    const newRequest = request.clone({ url: requestUrl });
    return next.handle(newRequest);
  }
}
