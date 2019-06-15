import { Ingredient } from '../shared/Ingredient.model';
import { Injectable, EventEmitter } from '@angular/core';

//@Injectable({providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient [] >();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients() {
    console.log('get ingredients: ' + this.ingredients.length);
    return this.ingredients.slice();
  }

  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredientsFromRecipe(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    console.log(this.ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

}
