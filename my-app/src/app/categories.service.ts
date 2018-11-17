import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from './category';
import { CategoriesApiService } from './categories-api.service';
import { CategoryFactory } from './category-factory';


@Injectable()
export class CategoriesService {

  private _categories = new BehaviorSubject<Category[]>([]);

  public get categories(): Observable<Category[]> {
    return this._categories.asObservable();
  }

  constructor(private cateoriesApiService: CategoriesApiService) { }

  public loadCategories() {
    this.cateoriesApiService.loadCategories()
      .subscribe(categoriesDTO => {
        const categories = [];
        categoriesDTO.forEach(categoryDTO => {
          categories.push(CategoryFactory.DTOToCategoy(categoryDTO));
        });
        this._categories.next(categories);
      },
        error => {
          console.error(error);
          // How to manage error?
        });
  }

  public removeCategory(code: string) {
    this.cateoriesApiService.deleteCategoryByCode(code)
      .subscribe(() => {
        const cats = this._categories.value;
        const index = cats.findIndex(cat => cat.code === code);
        this._categories.next([
          ...cats.slice(0, index),
          ...cats.slice(index + 1)
        ]);
      },
        error => {
          console.error(error);
          // How to manage error?
        });
  }

  public addCategory(category: Category) {
    this.cateoriesApiService.addCategory(CategoryFactory.CategoryToDTO(category))
      .subscribe(() => {
        const cats = this._categories.value;
        this._categories.next([
          ...cats,
          category,
        ]);
      },
        error => {
          console.error(error);
          // How to manage error?
        });
  }

  public substituteCategory(category: Category) {
    this.cateoriesApiService.modifyCategory(CategoryFactory.CategoryToDTO(category))
      .subscribe(() => {
        const index = this._categories.value.findIndex(cat => cat.code === category.code);
        const cats = Object.assign([], this._categories.value, {[index]: category});
        this._categories.next([
          ...cats
        ]);
      },
        error => {
          console.error(error);
          // How to manage error?
        });
  }

}
