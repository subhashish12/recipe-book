import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../store/shopping-list.action';
import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {


  @ViewChild('f') slForm:NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem : Ingredient;

  constructor(
    private store: Store<fromApp.AppState>

  ) { }

  ngOnInit(): void {
      this.subscription = this.store.select('shoppingList').subscribe(stateData=>{
      if(stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }else{
        this.editMode = false;
      }
    })
  }
  
  onAddItem(form:NgForm){
    const value = form.value;
    const newIng = new Ingredient(value.name, value.amount);
    if(this.editMode){
      // this.shoppingListService.updateIngredient(this.editedItemNumber,newIng);
      console.log('newIng', newIng)
      this.store.dispatch(new shoppingListActions.UpdateIngredient({  ingredient: newIng}))
    }else{
      // this.shoppingListService.addIngredient(newIng);
      this.store.dispatch(new shoppingListActions.AddIngredient(newIng));
    }
    form.reset();
    this.editMode = false;
  }

  onclear(){
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new shoppingListActions.StopEditing());

  }

  ondelete(){
    this.store.dispatch(new shoppingListActions.DeleteIngredient());
    // this.shoppingListService.deleteIngredient(this.editedItemNumber);
    this.onclear()
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new shoppingListActions.StopEditing());
  }
}
