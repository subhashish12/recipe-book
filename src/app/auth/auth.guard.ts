import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';



@Injectable({ providedIn: "root" })

export class AuthGuard  implements CanActivate{
    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>){}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):boolean | Promise<boolean> | Observable<boolean | UrlTree> | UrlTree {
        return this.store.select('auth').pipe( 
            take(1), 
            map(authState=>{
                console.log('11', authState)
                return authState.user;
            }),
            map(user=>{
                let isUser =  !!user;
                if(isUser){
                    return true;
                }
                return this.router.createUrlTree(['/auth'])
            })
        );
    }
}
