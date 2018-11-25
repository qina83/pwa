import { Component } from '@angular/core';
import { ConfirmEnum } from "./confirm-action";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  public actions = ConfirmEnum;

  constructor() { }

}
