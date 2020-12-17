import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStoreService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  private userSub: Subscription;
  isAuthenticated = false;
  constructor(private dataStoreService: DataStoreService, private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>){

  }

  ngOnInit(){
    this.userSub = this.store.select('auth').pipe(
      map(authState=>authState.user)
    ).subscribe(user=>{
      this.isAuthenticated  = !!user;
      console.log( this.isAuthenticated)
    });
  }

  saveData(){
    this.dataStoreService.storeRecipe();
  }

  fetchData(){
    this.dataStoreService.fetchRecipes().subscribe();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/auth'])
  }

}