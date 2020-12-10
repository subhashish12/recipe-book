import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoadingMode = false;
    error:string = null;
    constructor(private authService: AuthService, private router: Router){

    }


    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form:NgForm){
        this.isLoadingMode = true;
        if(!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        if(this.isLoginMode){
            this.authService.login(email, password).subscribe(data=>{
                console.log('d')
                console.log('login data', data);
                this.isLoadingMode = false;
                this.router.navigate(['/recipes']);

            }, err=>{
                console.log('error', err);
                this.isLoadingMode = false;
                this.error = 'An error occured';
            });
        }else{
            this.authService.signUp(email, password).subscribe(data=>{
                console.log('signup data', data);
                this.isLoadingMode = false;
                this.isLoginMode = true;
            }, err=>{
                console.log('error', err);
                this.isLoadingMode = false;
                this.error = 'An error occured';
            });
        }


        form.reset();
    }

}