import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refereshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: "root"})

export class AuthService{
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private store: Store<fromApp.AppState>){

    }

    signUp(email:string, password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseApiKey, {
            email: email,
            password: password,
            returnSecureToken: true
        })
    }


    login(email:string, password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseApiKey, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            tap(res=>{
                const expiry_date =  new Date(
                    new Date().getTime()+ +res.expiresIn * 1000
                );

                const user = new User(
                    res.email,
                    res.localId,
                    res.idToken,
                    expiry_date
                );
                
                this.store.dispatch(new AuthActions.Login({ email: user.email, userId: user.id, token: user.token, expiry_date: user._tokenEpirationDate}))

                localStorage.setItem('userData', JSON.stringify(user));
                // this.user.next(user);
                // this.store.dispatch(new AuthActions.)
            })
        )
    }

    autoLogin(){
        const userData = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }

        const loadedUser =  new User(userData.email, userData.id, userData._token, new Date(userData.expiry_date));
        if(loadedUser.token){
            // this.user.next(loadedUser)
            this.store.dispatch(new AuthActions.Login({email: loadedUser.email, userId: loadedUser.id, token: loadedUser.token, expiry_date: new Date(loadedUser._tokenEpirationDate)}))
        }
    }

    logout(){
        // this.user.next(null); 
        this.store.dispatch(new AuthActions.Logout());
        localStorage.removeItem('userData')
    }
}