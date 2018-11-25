import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../category';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catgories-manager',
  templateUrl: './categories-manager.component.html',
  styleUrls: ['./categories-manager.component.scss']
})
export class CategoriesManagerComponent implements OnInit {

  public categories: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService,
    private router: Router) {
    this.categories = categoriesService.categories;
  }

  public ngOnInit() {
    this.updateList();
  }

  public createNew() {
    this.router.navigate(['\categoryPage']);
  }

  private updateList() {
    this.categoriesService.loadCategories();
  }
}
