import {Component, inject, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {VisibilityService} from "../../services/visibility.service";

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
export class TechniqueTableComponent implements OnInit{
  public info = [
    {
      energy: 3,
      tab: 92051,
      fullName: "DZ-1800",
      output: "Сбойка-1",
      strongest: "А1-23415",
      timestamp: "20.12.2020 10:45:20",
    },
    {
      energy: 2,
      tab: 9384,
      fullName: "2АМ8Д",
      output: "Вентиляционный штрек",
      strongest: "А1-23416",
      timestamp: "20.12.2020 10:47:30",
    },
  ];

  isVisible = false;
  private visibilityService = inject(VisibilityService);

  ngOnInit() {
    this.visibilityService.techniqueVisibility$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }

  hideTechniqueTable() {
    this.visibilityService.toggleTechniqueVisibility(false);
  }
}
