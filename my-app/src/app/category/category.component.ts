import { Component } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../category';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  public categoryToEdit: Category;

  constructor(private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute) {
    const code: string = this.route.snapshot.params['code'];
    this.categoryToEdit = categoriesService.getCagetoryByCode(code);
  }

  onSubmit(form: any): void {
    console.log('you submitted value:', form, this.categoryToEdit);
    const category = this.categoryToEdit
      .setDirection(form['direction'])
      .setName(form['name'])
      .setIcon(form['icon']);
     this.categoriesService.substituteCategory(category);
     this.router.navigate(['/categoryPage']);
    // how to check that submit si completed?
  }


}
