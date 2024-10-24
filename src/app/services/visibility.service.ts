import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  private visibilitySource = new BehaviorSubject<boolean>(false);
  visibility$ = this.visibilitySource.asObservable();

  toggleVisibility(isVisible: boolean) {
    this.visibilitySource.next(isVisible);
  }
  constructor() { }
}
