import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../category';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmEnum } from '../confirm-dialog/confirm-action';

@Component({
  selector: 'app-catgories-manager',
  templateUrl: './categories-manager.component.html',
  styleUrls: ['./categories-manager.component.scss']
})
export class CategoriesManagerComponent implements OnInit {

  public categories: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService,
    private router: Router,
    private dialog: MatDialog) {
    this.categories = categoriesService.categories;
  }

  public ngOnInit() {
    this.updateList();
  }

  public createNew() {
    this.router.navigate(['\categoryPage']);
  }

  private updateList() {
    this.categoriesService.loadCategories()
    .catch();
  }

  public async deleteCategory(code: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === ConfirmEnum.Yes)
        this.categoriesService.removeCategory(code)
        .catch();
    });
  }

}
