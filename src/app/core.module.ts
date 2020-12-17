import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RecipeService } from './recipes/recipe.service';
import { AuthInterceptorService } from './shared/auth-intercepter.service';

@NgModule({
    providers:[ CommonModule, RecipeService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }]
})
export class CoreModule{}