import { Recipe } from './recipe.model';
import { Inject, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { EventEmitter } from 'protractor';

@Injectable() //imported to service where we want to import
export class RecipeService{
   recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Test1 asodugoa', 
      'very tasty aksudgvikavsdv', 
      'https://p0.pikist.com/photos/946/190/fusilloni-pasta-italy-italian-cuisine-tomatoes-fennel-almonds-typical-dish-recipe.jpg',
      [
        new Ingredient('Milk', 2),
        new Ingredient('CoCo', 3),
      ]
    ),
    new Recipe(
      'Tasty Cakes', 
      'lasbhdl lasihd aoisuhdb', 
      'https://p0.pikist.com/photos/118/55/cake-dessert-cakes-eating-sweets-sweet-pastries-sweet-dish-cake-with-cream.jpg',
      [
        new Ingredient('Milk', 2),
        new Ingredient('CoCo', 3),
        new Ingredient('Suger', 5),
      ]
    ),
    new Recipe(
      'Test Gulaab jamun', 
      'very tasty gulab jamuns', 
      'https://c1.wallpaperflare.com/preview/533/218/520/indian-sweet-gulab-jamun-indian-food.jpg',
      [
        new Ingredient('Milk', 2),
        new Ingredient('CoCo', 3),
        new Ingredient('Suger', 5),
      ]
    ),
    new Recipe(
      'Coco Barfi', 
      'Coco barfi ', 
      '//live.staticflickr.com/5172/30152072786_654a2ba3a1_b.jpg',
      [
        new Ingredient('Milk', 2),
        new Ingredient('CoCo', 3),
        new Ingredient('Suger', 5),
      ]
      )
  ];

  constructor(private shoppingListService: ShoppingListService){

  }


  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes.slice()[id];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]){
    console.log(2);
    this.shoppingListService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}