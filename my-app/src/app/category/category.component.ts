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

  public categoryToEdit: Category;

  constructor(private categoriesService: CategoriesService, private route: ActivatedRoute) {
    const code: string = this.route.snapshot.params['code'];
    this.categoryToEdit = categoriesService.getCagetoryByCode(code);
  }

  onSubmit(form: any): void {
    console.log('you submitted value:', form);
    //how to check that submit si completed?
  }


}
