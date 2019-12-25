import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers'

@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService,
              private authService: AuthService, private store: Store<AppState>) {

  }

  storeRecipes() {
    return this.httpClient.put('https://recipe-book-ng-1.firebaseio.com/recipes.json',
      this.recipeService.getRecipe());
  }

  getRecipes() {
    //const token = this.authService.getToken();
    let token: string;
    const auth = this.store.select('auth')
      .subscribe(
          (state: fromAuth.State) => {
            console.log(state)
            token = state.token;
          }
        );
    return this.httpClient.get<Recipe[]>(
        'https://recipe-book-ng-1.firebaseio.com/recipes.json?auth=' + token, 
      )
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
