import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  private techniqueVisibilitySource = new BehaviorSubject<boolean>(false);
  private stuffVisibilitySource = new BehaviorSubject<boolean>(false);

  techniqueVisibility$ = this.techniqueVisibilitySource.asObservable();
  stuffVisibility$ = this.stuffVisibilitySource.asObservable();

  toggleTechniqueVisibility(isVisible: boolean) {
    this.techniqueVisibilitySource.next(isVisible);
  }

  toggleStuffVisibility(isVisible: boolean) {
    this.stuffVisibilitySource.next(isVisible);
  }
  constructor() { }
}
