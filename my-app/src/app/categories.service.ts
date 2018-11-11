import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from './category';
import { CategoriesApiService } from './categories-api.service';


@Injectable()
export class CategoriesService {

  private _categories = new BehaviorSubject<Category[]>(null);

  public get categories(): Observable<Category[]> {
    return this._categories.asObservable();
  }

  constructor(private cateoriesApiService: CategoriesApiService) { }

  public loadCategories() {
    this.cateoriesApiService.loadCategories()
      .then(categoriesDTO => {
        const categories = [];
        categoriesDTO.forEach(categoryDTO => {
          const category = new Category();
          category.mapFromDTO(categoryDTO);
        });
        this._categories.next(categories);
      })
      .catch(reason => {
        console.error(reason);
        // How to manage error?
      });
  }

  public removeCatgory(code: string) {
    this.cateoriesApiService.deleteCategoryByCode(code)
      .then(() => {
        const cats = this._categories.value;
        const index = cats.findIndex(cat => cat.code === code);
        this._categories.next([
          ...cats.slice(0, index),
          ...cats.slice(index + 1)
        ]);
      }).catch(reason => {
        console.error(reason);
        // How to manage error?
      });
  }

  public addCategory(category: Category) {
    this.cateoriesApiService.addCategory(category)
      .then(() => {
        const cats = this._categories.value;
        this._categories.next([
          ...cats,
          category,
        ]);
      })
      .catch(reason => {
        console.error(reason);
        // How to manage error?
      });
  }

  public modifyCategory(category: Category) {
    // how to using immutable?
  }

}
