import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';

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

    constructor(private http: HttpClient){

    }

    signUp(email:string, password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7xiZrSjNHf5CCGCP1jiDvpIgo6il9ZGo', {
            email: email,
            password: password,
            returnSecureToken: true
        })
    }


    login(email:string, password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7xiZrSjNHf5CCGCP1jiDvpIgo6il9ZGo', {
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
                
                localStorage.setItem('userData', JSON.stringify(user));
                this.user.next(user);
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
            this.user.next(loadedUser)
        }
    }

    logout(){
        this.user.next(null); 
        localStorage.removeItem('userData')
    }
}