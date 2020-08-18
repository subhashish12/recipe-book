import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe:Recipe ;
  id: number;
  constructor(private recipeService: RecipeService, 
    private route : ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        console.log('paranms', params)
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  addToShoppingList(){
    console.log('1');
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients)
  }
  onRecipeEdit(){
    this.router.navigate(['edit'], { relativeTo: this.route});

    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route } );
  }


}
