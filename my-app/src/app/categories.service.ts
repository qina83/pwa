import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from './category';
import { CategoriesApiService } from './categories-api.service';
import { CategoryFactory } from './category-factory';
import { tap, map } from 'rxjs/operators';
import { ErrorsService, ErrorData } from './errors.service';


@Injectable()
export class CategoriesService {

  private _categories = new BehaviorSubject<Category[]>([]);

  public get categories(): Observable<Category[]> {
    return this._categories.asObservable();
  }

  constructor(private cateoriesApiService: CategoriesApiService, private errorsService: ErrorsService) { }

  public loadCategories(): Promise<void> {
    return this.cateoriesApiService.loadCategories()
      .pipe(
        tap((categoriesDTO) => {
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
        this.errorsService.sendError(error.message);
        console.log(error);
        throw new Error(error);
      });
  }

  public removeCategory(code: string): Promise<void> {
    return this.cateoriesApiService.deleteCategoryByCode(code)
      .toPromise()
      .then(() => {
        return this.loadCategories();
      })
      .catch(error => {
        this.errorsService.sendError(error.message);
        throw new Error(error);
      });
  }

  public addCategory(category: Category): Promise<void> {
    return this.cateoriesApiService.addCategory(CategoryFactory.CategoryToDTO(category))
      .toPromise()
      .then(() => {
        return this.loadCategories();
      })
      .catch(error => {
        this.errorsService.sendError(error.message);
        throw new Error(error);
      });
  }

  public substituteCategory(category: Category): Promise<void> {
    return this.cateoriesApiService.modifyCategory(CategoryFactory.CategoryToDTO(category))
      .toPromise()
      .then(() => {
        return this.loadCategories();
      })
      .catch(error => {
        this.errorsService.sendError(error.message);
        throw new Error(error);
      });
  }

  public getCagetoryByCode(code: string): Category {
    return this._categories.value.find(cat => cat.code === code);
  }

}
