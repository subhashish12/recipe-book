import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators'

@Injectable({ providedIn: "root" })
export class DataStoreService{
    constructor(private http: HttpClient, private recipeService: RecipeService){

    }

    storeRecipe(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ang-recipe-97de6.firebaseio.com/recipes.json', recipes).subscribe(response=>{
            console.log('response', response);
        })
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>('https://ang-recipe-97de6.firebaseio.com/recipes.json')
        .pipe(map(recipes =>{
            return recipes.map(recipe=>{
                console.log('sdsd', recipe)
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
            })
        }),
        tap(recipes=>{
            this.recipeService.setRecipes(recipes);
        }))

    }

}