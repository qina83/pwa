import { Component } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints
} from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ErrorSnackBarComponent } from '../error-snack-bar/error-snack-bar.component';
import { ErrorsService, ErrorData } from '../errors.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, public snackBar: MatSnackBar, errorService: ErrorsService) {
    errorService.errors.subscribe(error => {
      this.openSnackBar(error);
    });
  }

  openSnackBar(errorData: ErrorData) {
    this.snackBar.openFromComponent(ErrorSnackBarComponent, {
      data: errorData,
      duration: 2000,
      panelClass: ['red-snackbar']
    });
  }

}
