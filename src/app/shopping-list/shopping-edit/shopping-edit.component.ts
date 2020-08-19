import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm:NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemNumber: number; 
  editedItem : Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }
  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing 
    .subscribe(
      (index: number)=>{
        this.editedItemNumber = index;
        this.editedItem =  this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
        this.editMode = true;

      } 
    )
  }
  
  onAddItem(form:NgForm){
    const value = form.value;
    const newIng = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemNumber ,newIng);
    }else{
      this.shoppingListService.addIngredient(newIng);
    }
    form.reset();
    this.editMode = false;
  }

  onclear(){
    this.slForm.reset();
    this.editMode = false;
  }

  ondelete(){
    this.shoppingListService.deleteIngredient(this.editedItemNumber);
    this.onclear()
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
