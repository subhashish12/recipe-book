import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.action';

const initialState = {
    ingredients : [
        new Ingredient('Tomato', 21),
        new Ingredient('Ginger', 22),
      ],
      editedIngredient: null,
      editedIngredientIndex: -1
}

export interface State{
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number

}




export function shoppingListReducer(
    state = initialState, 
    action: ShoppingListActions.ShoppingListActionsType
    ){
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }    
        case ShoppingListActions.UPDATE_INGREDIENT: debugger;
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            }
            console.log('updatedIngredient', updatedIngredient)
            const updatedIngredients =  [ ...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            }      

        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, index)=>{
                    return index !== state.editedIngredientIndex;
                }),
                editedIngredient: null,
                editedIngredientIndex: -1
            }  
        case ShoppingListActions.START_EDITING:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
            }  
            
        case ShoppingListActions.STOP_EDITING:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }               
        default:
            return state; 
    }
}