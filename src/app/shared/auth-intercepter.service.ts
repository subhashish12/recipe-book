import { HttpHandler, HttpParams, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { pipe } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService, private store: Store<fromApp.AppState>){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log('asdas')
        return this.store.select('auth').pipe(
            take(1),
            map(authState=>{
                return authState.user;
            }),
            exhaustMap(user=>{
                if(!user){
                    return next.handle(req);
                }

                const modifiedReq =  req.clone({ params: new HttpParams().set('auth', user.token)})
                return next.handle(modifiedReq)
            
            })
        )
    }
}