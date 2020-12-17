import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = '[Shopping List] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[Shopping List] ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = '[Shopping List] UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = '[Shopping List] DELETE_INGREDIENTS';
export const START_EDITING = '[Shopping List] START_EDITING';
export const STOP_EDITING = '[Shopping List] STOP_EDITING';




export class AddIngredient implements Action{
    readonly type = ADD_INGREDIENT;

    constructor(public payload: Ingredient ){}
}

export class AddIngredients implements Action{
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[] ){}
}

export class UpdateIngredient implements Action{
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: { ingredient: Ingredient } ){}
}
export class DeleteIngredient implements Action{
    readonly type = DELETE_INGREDIENT;

    constructor(){}
}

export class StartEditing implements Action{
    readonly type = START_EDITING;
    
    constructor(public payload: number ){}
}

export class StopEditing implements Action{
    readonly type = STOP_EDITING;
}



export type ShoppingListActionsType = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient | StartEditing | StopEditing; //custom type