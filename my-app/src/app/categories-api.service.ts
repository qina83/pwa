import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { CategoryDTO } from './category-dto';
import { Observable, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

const CATEGORY_COLLECTION_NAME = 'categories';

@Injectable()
export class CategoriesApiService {

  private _isLogged = false;
  private _user: firebase.auth.UserCredential;

  constructor(private dbFireService: AngularFirestore,
    private authFireService: AngularFireAuth) {

  }

  private async login(): Promise<firebase.auth.UserCredential> {
    if (this._isLogged) return Promise.resolve(this._user); else {
      const credential = await this.authFireService.auth.signInWithEmailAndPassword('', '');
      return this._user = credential;
    }
  }

  public loadCategories(): Observable<CategoryDTO[]> {
    return from(this.login()).pipe(
      concatMap(() =>
        this.dbFireService.collection(CATEGORY_COLLECTION_NAME)
          .get()
          .pipe(map(data => {
            const categories: CategoryDTO[] = [];
            data.docs.forEach(doc => {
              categories.push((<CategoryDTO>doc.data()));
            });
            return categories;
          }))));
  }

  public addCategory(category: CategoryDTO): Observable<void> {
    return from(this.login()).pipe(
      concatMap(() => from(this.dbFireService.collection(CATEGORY_COLLECTION_NAME)
        .doc(category.code).set(category))));
  }


  public modifyCategory(category: CategoryDTO): Observable<void> {
    return from(this.login()).pipe(
      concatMap(() => from(this.dbFireService.collection(CATEGORY_COLLECTION_NAME)
        .doc(category.code).set(category))));
  }


  public deleteCategoryByCode(code: string): Observable<void> {
    return from(this.login()).pipe(
      concatMap(() => from(this.dbFireService.collection(CATEGORY_COLLECTION_NAME)
        .doc(code).delete())));
  }
}
