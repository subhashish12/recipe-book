import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
export class ShoppingListService{
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  ingredients :Ingredient[]=[
    new Ingredient('Tomato', 21),
    new Ingredient('Ginger', 22),
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index:number){
    return this.ingredients[index];
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

  updateIngredient(index:number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }
  
  deleteIngredient(index:number){
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}