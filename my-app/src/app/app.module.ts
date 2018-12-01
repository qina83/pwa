import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MainPageComponent } from './main-page/main-page.component';
import { SecondaryPageComponent } from './secondary-page/secondary-page.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CategoriesManagerComponent } from './categories-manager/categories-manager.component';
import { CategoriesApiService } from './categories-api.service';
import { CategoriesService } from './categories.service';
import { ErrorsService } from './errors.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

import { CategoriesJSApiService } from './categories-JSapi.service';
import { CategoryComponent } from './category/category.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ErrorSnackBarComponent } from './error-snack-bar/error-snack-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainPageComponent,
    SecondaryPageComponent,
    CategoriesManagerComponent,
    CategoryComponent,
    ConfirmDialogComponent,
    ErrorSnackBarComponent
  ],
  imports: [
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AngularFireModule.initializeApp((<any>environment).firebase, 'MoneyLeft3'), // any just to aviod error for the moment
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  entryComponents: [ConfirmDialogComponent, ErrorSnackBarComponent],
  providers: [CategoriesService,
    ErrorsService,
    {
      provide: CategoriesApiService,
      useClass: CategoriesJSApiService
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
