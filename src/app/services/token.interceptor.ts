import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
constructor(private authService : AuthService) {}
intercept(request: HttpRequest<unknown>, next: HttpHandler):
Observable<HttpEvent<unknown>> {
const toExclude = "/login";
const toExclude1= "/add";
const toExclude2 = '/listeUser';
const toExclude3 = '/activateUser';
//tester s'il sagit de login, on n'ajoute pas le header Authorization
//puisqu'on a pas encode de JWT (il est null)
if(
  request.url.search(toExclude) === -1 &&
  request.url.search(toExclude1) === -1 &&
  request.url.search(toExclude2) === -1 &&
  request.url.search(toExclude3) === -1
){
    let jwt = this.authService.getToken();
    let reqWithToken = request.clone( {

    setHeaders: { Authorization : "Bearer "+jwt}
})
return next.handle(reqWithToken);
}
return next.handle(request);
}
}