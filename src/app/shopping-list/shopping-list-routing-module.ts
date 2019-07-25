import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule, Routes } from '@angular/router';

const shoppingListRoutes: Routes = [

];

@NgModule({
  imports: [
    RouterModule.forChild(shoppingListRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShoppingListRoutingModule {

}
