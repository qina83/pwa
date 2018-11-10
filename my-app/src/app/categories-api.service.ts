import { Injectable } from '@angular/core';
import { Category } from './category';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const CATEGORY_COLLECTION_NAME = 'categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService {

  private _isLogged = false;

  constructor(private dbFireService: AngularFirestore,
    private authFireService: AngularFireAuth) {

  }

  private login() {
    this.authFireService.auth.signInWithEmailAndPassword('', '')
      .then(() => this._isLogged = true)
      .catch(() => {
        // manage error
      });

  }

  public loadCategories(): Promise<Category[]> {
   this.dbFireService.collection(CATEGORY_COLLECTION_NAME)
      .get()
      .pipe(map(data => data.forEach(d =>{
        d.data.
      })))
      .toPromise();
  }

  public addCategory(category: Category): Promise<boolean> {

  }


  public modifyCategory(category: Category): Promise<boolean> {

  }


  public deleteCategoryByCode(code: string): Promise<boolean> {

  }
}
