import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { SecondaryPageComponent } from './secondary-page/secondary-page.component';
import { CategoriesManagerComponent } from './categories-manager/categories-manager.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  { path: 'mainPage', component: MainPageComponent },
  { path: 'secondaryPage', component: SecondaryPageComponent },
  { path: 'categoryPage', component: CategoriesManagerComponent , pathMatch: 'full'},
  { path: 'categoryPage/:code', component: CategoryComponent },
  {
    path: '',
    redirectTo: '/categoryPage',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
