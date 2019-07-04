import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/Ingredient.model';
import { Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is a Test recipe',
      'https://media-public.canva.com/MABE3F9akJI/1/screen_2x.jpg',
      [
        new Ingredient('test', 1),
        new Ingredient('bread', 3)
      ]
      ),
    new Recipe(
      'A Second Recipe',
      'Second Test Recipe',
      'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg',
      [
        new Ingredient('veggies', 10),
        new Ingredient('ketch', 2)
      ])
    ];

  constructor(private shoppingListService: ShoppingListService) {

  }

  getRecipe() {
    return this.recipes.slice();
  }

  getRecipeById(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    console.log('recipe service: ' + ingredients)
    this.shoppingListService.addIngredientsFromRecipe(ingredients);
  }

}
