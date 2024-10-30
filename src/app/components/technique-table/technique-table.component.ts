import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {VisibilityService} from "../../services/visibility.service";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-technique-table',
  standalone: true,
    imports: [
        NgForOf,
        NgIf
    ],
  templateUrl: './technique-table.component.html',
  styleUrl: './technique-table.component.css'
})
export class TechniqueTableComponent implements OnInit, OnDestroy{
  public isVisible = false;

  private visibilityService = inject(VisibilityService);
  private dataService = inject(DataService);
  public technique = this.dataService.technique;

  ngOnInit() {
    this.visibilityService.techniqueVisibility$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });

    this.updateDate();
    this.intervalId = setInterval(() => this.updateDate(), 5000);
  }

  hideTechniqueTable() {
    this.visibilityService.toggleTechniqueVisibility(false);
    this.visibilityService.closeTechnique();
  }

  formattedDate: string = '';
  private intervalId: any;

  updateDate(): void {
    const now = new Date();
    this.formattedDate = `${this.pad(now.getDate())}.${this.pad(now.getMonth() + 1)}.${now.getFullYear()} ` +
      `${this.pad(now.getHours())}:${this.pad(now.getMinutes())}:${this.pad(now.getSeconds())}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
