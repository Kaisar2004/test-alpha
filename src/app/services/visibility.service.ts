import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  private techniqueVisibilitySource = new BehaviorSubject<boolean>(false);
  private stuffVisibilitySource = new BehaviorSubject<boolean>(false);
  private messageVisibilitySource = new BehaviorSubject<boolean>(false);
  private deviceVisibilitySource = new BehaviorSubject<boolean>(false);

  techniqueVisibility$ = this.techniqueVisibilitySource.asObservable();
  stuffVisibility$ = this.stuffVisibilitySource.asObservable();
  messageVisibility$ = this.messageVisibilitySource.asObservable();
  deviceVisibility$ = this.deviceVisibilitySource.asObservable();

  toggleTechniqueVisibility(isVisible: boolean) {
    this.techniqueVisibilitySource.next(isVisible);
  }

  toggleStuffVisibility(isVisible: boolean) {
    this.stuffVisibilitySource.next(isVisible);
  }

  toggleMessageVisibility(isVisible: boolean) {
    this.messageVisibilitySource.next(isVisible);
  }
  toggleDeviceVisibility(isVisible: boolean) {
    this.deviceVisibilitySource.next(isVisible);
  }


  private _closePersonnel = new Subject<void>();
  private _closeTechnique = new Subject<void>();
  private _closeMessage = new Subject<void>();
  private _closeDevice = new Subject<void>();

  public closePersonnel$ = this._closePersonnel.asObservable();
  public closeTechnique$ = this._closeTechnique.asObservable();
  public closeMessage$ = this._closeMessage.asObservable();
  public closeDevice$ = this._closeDevice.asObservable();

  closePersonnel() {
    this._closePersonnel.next();
  }

  closeTechnique() {
    this._closeTechnique.next();
  }

  closeMessage() {
    this._closeMessage.next();
  }
  closeDevice() {
    this._closeDevice.next();
  }
}
