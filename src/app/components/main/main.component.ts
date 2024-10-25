import {Component, inject, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {VisibilityService} from "../../services/visibility.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  public info = [
    {
      image: "../../../assets/images/avatar.png",
      tab: 92051,
      name: "Новиков М.К.",
      message: "Газовый контроль превышен на 1% необходимо исправить в срочном порядке...",
      date: "15.10.2020 10:20",
    },
    {
      image: "../../../assets/images/avatar.png",
      tab: 92341,
      name: "Насиполла К.А.",
      message: "Газовый контроль превышен на 15% необходимо исправить в срочном порядке...",
      date: "19.10.2020 10:20",
    },
  ];

  public isVisible = false;
  private visibilityService = inject(VisibilityService);

  ngOnInit() {
    this.visibilityService.messageVisibility$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }


  showMessageWindow(event: Event, elementId: string) {
    this.visibilityService.toggleMessageVisibility(true);
  }
  hideMessage() {
    this.visibilityService.toggleMessageVisibility(false);
  }
}
