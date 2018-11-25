import { Component } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../category';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmEnum } from '../confirm-dialog/confirm-action';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  public categoryToEdit: Category;

  private newCategory: boolean = false;

  constructor(private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    const code: string = this.route.snapshot.params['code'];
    if (!code) {
      this.newCategory = true;
      this.categoryToEdit = new Category();
    }
    else {
      this.newCategory = false;
      this.categoryToEdit = categoriesService.getCagetoryByCode(code);
    }
  }

  public onSubmit(form: any): void {
    console.log('you submitted value:', form, this.categoryToEdit);
    const category = this.categoryToEdit
      .setDirection(form['direction'])
      .setName(form['name'])
      .setIcon(form['icon']);

    if (this.newCategory)
      this.categoriesService.addCategory(category);
    else
      this.categoriesService.substituteCategory(category);

    this.router.navigate(['/categories']);
    // how to check that submit si completed?
  }


  private requestConfirm() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === ConfirmEnum.Yes)
        this.router.navigate(['/categories']);
    });
  }


  public dismiss() {
    this.requestConfirm();
  }


}
