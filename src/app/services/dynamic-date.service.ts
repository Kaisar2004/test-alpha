import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, interval, map, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DynamicDateService implements OnDestroy{
  private dateSubject = new BehaviorSubject<string>(this.formatDate(new Date()));
  private subscription: Subscription;

  constructor() {
    this.subscription = interval(5000)
      .pipe(map(() => this.formatDate(new Date())))
      .subscribe(dateString => this.dateSubject.next(dateString));
  }

  getDateObservable() {
    return this.dateSubject.asObservable();
  }

  private formatDate(date: Date): string {
    return `${this.pad(date.getDate())}.${this.pad(date.getMonth() + 1)}.${date.getFullYear()} ` +
      `${this.pad(date.getHours())}:${this.pad(date.getMinutes())}:${this.pad(date.getSeconds())}`;
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
