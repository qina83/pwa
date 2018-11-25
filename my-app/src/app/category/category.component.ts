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

  private newCategory: boolean = false;

  constructor(private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute) {
    const code: string = this.route.snapshot.params['code'];
    if (!code) {
      this.newCategory = true;
      this.categoryToEdit = new Category();
    }
    else {
      this.newCategory = false;
      this.categoryToEdit = categoriesService.getCagetoryByCode(code);
    }
  }

  onSubmit(form: any): void {
    console.log('you submitted value:', form, this.categoryToEdit);
    const category = this.categoryToEdit
      .setDirection(form['direction'])
      .setName(form['name'])
      .setIcon(form['icon']);

    if (this.newCategory)
      this.categoriesService.addCategory(category);
    else
      this.categoriesService.substituteCategory(category);

    this.router.navigate(['/categories']);
    // how to check that submit si completed?
  }


  public dismiss(){
    this.router.navigate(['/categories']);
  }


}
