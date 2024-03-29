import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {SpinnerService} from "../service/spinner.service";
import {Observable, tap} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()

export class CustomHttpInterceptor implements HttpInterceptor{

  constructor(private spinnerService: SpinnerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.spinnerService.show();

    return next
      .handle(req)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if(event instanceof HttpResponse){
            this.spinnerService.hide();
          }
        }, () => {
          this.spinnerService.hide();
        })
      );
  }

}
