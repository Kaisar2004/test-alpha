import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {VisibilityService} from "../../services/visibility.service";

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
  public info = [
    {
      energy: 3,
      tab: 92051,
      fullName: "Насиполла К.А",
      output: "Сбойка-1",
      strongest: "А1-23415",
      timestamp: "20.12.2020 10:45:00",
    },
    {
      energy: 2,
      tab: 9384,
      fullName: "Новиков М. К",
      output: "Вентиляционный штрек",
      strongest: "А1-23416",
      timestamp: "20.12.2020 10:47:00",
    },
  ];

  isVisible = false;
  private visibilityService = inject(VisibilityService);

  ngOnInit() {
    this.visibilityService.stuffVisibility$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }

  hideStuffTable() {
    this.visibilityService.toggleStuffVisibility(false);
  }
}
