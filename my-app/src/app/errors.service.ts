import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface ErrorData {
  message: string;
}

@Injectable()
export class ErrorsService {

  private _errors: Subject<ErrorData> = new Subject<ErrorData>();

  public get errors(): Observable<ErrorData> {
    return this._errors.asObservable();
  }

  public sendError(errorMessage: string) {
    this._errors.next({
      message: errorMessage
    });
  }
}
