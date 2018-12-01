import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from './category';
import { CategoriesApiService } from './categories-api.service';
import { CategoryFactory } from './category-factory';
import { concatMap, tap, map } from 'rxjs/operators';


@Injectable()
export class CategoriesService {

  private _categories = new BehaviorSubject<Category[]>([]);

  public get categories(): Observable<Category[]> {
    return this._categories.asObservable();
  }

  constructor(private cateoriesApiService: CategoriesApiService) { }

  public loadCategories(): Promise<void> {
    return this.cateoriesApiService.loadCategories()
      .pipe(
        tap((categoriesDTO) => {
          console.log('sss');
          const categories = [];
          categoriesDTO.forEach(categoryDTO => {
            categories.push(CategoryFactory.DTOToCategoy(categoryDTO));
          });
          this._categories.next(categories);
        }),
        map((data) => { })
      )
      .toPromise()
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  public removeCategory(code: string): Promise<void> {
    return this.cateoriesApiService.deleteCategoryByCode(code)
      .toPromise()
      .then(() => {
        this.loadCategories();
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  public addCategory(category: Category): Promise<void> {
    return this.cateoriesApiService.addCategory(CategoryFactory.CategoryToDTO(category))
      .toPromise()
      .then(() => {
        console.log('ASDAD');
        return this.loadCategories();
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  public substituteCategory(category: Category): Promise<void> {
    return this.cateoriesApiService.modifyCategory(CategoryFactory.CategoryToDTO(category))
      .toPromise()
      .then(() => this.loadCategories())
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  public getCagetoryByCode(code: string): Category {
    return this._categories.value.find(cat => cat.code === code);
  }

}
