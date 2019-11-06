import { ToastrService } from 'ngx-toastr';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


// based entirely on: https://itnext.io/handle-http-responses-with-httpinterceptor-and-toastr-in-angular-3e056759cb16
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(public toasterService: ToastrService)  {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(evt => { // we just let success results go
      }),
      catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
              try {
                  this.toasterService.error(err.error.message, err.error.title, { positionClass: 'toast-bottom-center' });
              } catch (e) {
                  this.toasterService.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
              }
          }
          return of(err);
      }));

    }
  }






