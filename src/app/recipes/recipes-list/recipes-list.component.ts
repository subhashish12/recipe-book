import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes : Recipe[];



  constructor(private recipeService: RecipeService,
              private router: Router, 
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeService.recipeChanged.subscribe(
      (recipes : Recipe[])=>{
        this.recipes = recipes;
      }
    )
    this.recipes =  this.recipeService.getRecipes();
  }
  onRecipeSelected(recipe: Recipe){
    console.log("recipe", recipe);
    this.recipeWasSelected.emit(recipe);
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  
}
