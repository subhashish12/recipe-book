import { 
  Component,
  OnInit,
  OnChanges, 
  SimpleChanges,
  Input, OnDestroy} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})

export class ShoppingListComponent implements OnInit, OnDestroy {
  @Input() randomNumber : any;
  ingredients :Ingredient[]=[];

  private igchange : Subscription;
  constructor(private shoppingListService: ShoppingListService) { 
    console.log('constructor called', this.randomNumber)
  }

  // ngOnChanges(changes: SimpleChanges):void{
  //   console.log('ngOnchanges called')
  //   console.log('changes ', changes);
  // }
  onIngredientAdded(ingredient){
    console.log("insd", ingredient)
    this.ingredients.push(ingredient);
  }

  ngOnInit(): void {
   this.ingredients = this.shoppingListService.getIngredients();
   this.igchange =  this.shoppingListService.ingredientChanged.subscribe(
     (ingredents: Ingredient[])=>{
       this.ingredients = ingredents;
     }
   )
  }

  ngOnDestroy(): void{
    this.igchange.unsubscribe();
  }

}
