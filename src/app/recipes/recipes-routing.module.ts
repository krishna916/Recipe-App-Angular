import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AuthGuard } from '../auth/auth-guard.service';

const recipeRoutes: Routes = [
  { path: '', component:  RecipesComponent, children: [
    { path: '', component: RecipeStartComponent, pathMatch: 'full' },
    { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(recipeRoutes),
  ],
  exports: [RouterModule],
  providers: [AuthGuard] // can be added here as its related to routes
})
export class RecipesRoutingModule {
}
