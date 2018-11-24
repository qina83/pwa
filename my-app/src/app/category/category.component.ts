import { Component } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../category';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  categories: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService, private route: ActivatedRoute) {
    this.categories = categoriesService.categories;
    console.log('CODE', this.route.snapshot.params['code']);
  }

}
