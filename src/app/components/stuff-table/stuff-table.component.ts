import { Component, inject, OnInit } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {VisibilityService} from "../../services/visibility.service";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-stuff-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './stuff-table.component.html',
  styleUrl: './stuff-table.component.css'
})
export class StuffTableComponent implements OnInit{
  public isVisible = false;

  private visibilityService = inject(VisibilityService);
  private dataService = inject(DataService);

  public stuff = this.dataService.stuff;

  ngOnInit() {
    this.visibilityService.stuffVisibility$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }

  hideStuffTable() {
    this.visibilityService.toggleStuffVisibility(false);
    this.visibilityService.closePersonnel();
  }
}
