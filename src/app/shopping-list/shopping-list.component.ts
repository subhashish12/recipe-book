import { 
  Component,
  OnInit,
  OnChanges, 
  SimpleChanges,
  Input, OnDestroy} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as shoppingListActions from './store/shopping-list.action';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})

export class ShoppingListComponent implements OnInit, OnDestroy {
  @Input() randomNumber : any;
  ingredients: Observable<{ ingredients: Ingredient[]}>

  private igchange : Subscription;
  constructor(
    private store:  Store<fromApp.AppState>
  ) { 
    console.log('constructor called', this.randomNumber)
  }

  // ngOnChanges(changes: SimpleChanges):void{
  //   console.log('ngOnchanges called')
  //   console.log('changes ', changes);
  // }
  // onIngredientAdded(ingredient){
  //   console.log("insd", ingredient)
  //   // this.ingredients.push(ingredient);
  // }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')
    console.log('this.in', this.ingredients)
    

  //  this.ingredients = this.shoppingListService.getIngredients();
  //  this.igchange =  this.shoppingListService.ingredientChanged.subscribe(
  //    (ingredents: Ingredient[])=>{
  //      this.ingredients = ingredents;
  //    }
  //  )
  }

  onEditItem(index:number){
    console.log('indddd', index)
    this.store.dispatch(new shoppingListActions.StartEditing(index))
    // this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void{
    // this.igchange.unsubscribe();
  }



}
