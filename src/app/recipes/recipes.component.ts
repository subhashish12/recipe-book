import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;

  constructor(  private router: Router, 
    private route : ActivatedRoute) { }

  ngOnInit(): void {

  }

  recipeDetails(recipe){
    console.log("recipe top",recipe)
    this.selectedRecipe = recipe;
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(){
  }
}
