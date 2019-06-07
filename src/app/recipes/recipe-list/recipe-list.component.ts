import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is a Test recipe', 'https://media-public.canva.com/MABE3F9akJI/1/screen_2x.jpg'),
    new Recipe('A Second Recipe', 'Second Test Recipe', 'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg')
    ];

  constructor() { }

  ngOnInit() {
  }

}
