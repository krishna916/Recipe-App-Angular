import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {

  }

  storeRecipes() {
    return this.httpClient.put('https://recipe-book-ng-1.firebaseio.com/recipes.json',
      this.recipeService.getRecipe());
  }

  getRecipes() {
    return this.httpClient.get<Recipe[]>('https://recipe-book-ng-1.firebaseio.com/recipes.json')
      .pipe(map(
        (recipes: Recipe[]) => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['imagePath'] = '';
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
         this.recipeService.setRecipes(recipes);
        }
      );
  }
}
