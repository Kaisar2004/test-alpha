import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  private techniqueVisibilitySource = new BehaviorSubject<boolean>(false);
  private stuffVisibilitySource = new BehaviorSubject<boolean>(false);

  // Экспозиция Observable для каждой таблицы
  techniqueVisibility$ = this.techniqueVisibilitySource.asObservable();
  stuffVisibility$ = this.stuffVisibilitySource.asObservable();

  // Методы для управления видимостью каждой таблицы
  toggleTechniqueVisibility(isVisible: boolean) {
    this.techniqueVisibilitySource.next(isVisible);
  }

  toggleStuffVisibility(isVisible: boolean) {
    this.stuffVisibilitySource.next(isVisible);
  }
  constructor() { }
}
