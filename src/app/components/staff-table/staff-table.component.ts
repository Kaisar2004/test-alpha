import { Component, inject, OnInit } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {VisibilityService} from "../../services/visibility.service";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-staff-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './staff-table.component.html',
  styleUrl: './staff-table.component.css'
})
export class staffTableComponent implements OnInit{
  public isVisible = false;

  private visibilityService = inject(VisibilityService);
  private dataService = inject(DataService);

  public staff = this.dataService.staff;

  ngOnInit() {
    this.visibilityService.staffVisibility$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }

  hidestaffTable() {
    this.visibilityService.togglestaffVisibility(false);
    this.visibilityService.closePersonnel();
  }
}
