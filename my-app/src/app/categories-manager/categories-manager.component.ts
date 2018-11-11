import { Component } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catgories-manager',
  templateUrl: './categories-manager.component.html',
  styleUrls: ['./categories-manager.component.scss']
})
export class CategoriesManagerComponent {

  public categories: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) {
    this.categories = categoriesService.categories;
  }
  
  public updateList() {
    this.categoriesService.loadCategories();
  }

}
