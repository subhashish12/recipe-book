import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataStoreService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
@Injectable ({ providedIn: 'root'})

export class RecipeResolverService implements Resolve<Recipe[]> {
    constructor(private dataStorageService: DataStoreService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.dataStorageService.fetchRecipes()
    }
}