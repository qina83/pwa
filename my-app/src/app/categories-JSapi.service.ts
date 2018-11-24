import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CategoryDTO } from './category-dto';
import { Observable, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const CATEGORY_COLLECTION_NAME = 'categories';

@Injectable()
export class CategoriesJSApiService {

  private _isLogged = false;
  private _user: firebase.auth.UserCredential;

  constructor(private http: HttpClient) {

  }

  public loadCategories(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>('http://localhost:3000/categories');
  }

  public addCategory(category: CategoryDTO): Observable<void> {
    return this.http.post<void>('http://localhost:3000/categories', category);
  }


  public modifyCategory(category: CategoryDTO): Observable<void> {
    return this.http.put<void>('http://localhost:3000/categories/' + category.code, category);
  }


  public deleteCategoryByCode(code: string): Observable<void> {
    return this.http.delete<void>('http://localhost:3000/categories/' + code);
  }
}
