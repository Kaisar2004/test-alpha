import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

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


  private _closePersonnel = new Subject<void>();
  private _closeTechnique = new Subject<void>();

  public closePersonnel$ = this._closePersonnel.asObservable();
  public closeTechnique$ = this._closeTechnique.asObservable();

  closePersonnel() {
    this._closePersonnel.next();
  }

  closeTechnique() {
    this._closeTechnique.next();
  }
}
