import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
export class ShoppingListService{
  ingredientChanged = new Subject<Ingredient[]>();
  ingredients :Ingredient[]=[
    new Ingredient('Tomato', 21),
    new Ingredient('Ginger', 22),
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    console.log(3)
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());

    // for(let ingredient of ingredients){
    //   this.addIngredient(ingredient);
    // }
  }
}