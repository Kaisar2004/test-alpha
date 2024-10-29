import {Component, inject, OnInit} from '@angular/core';
import {NgClass, NgOptimizedImage, NgStyle} from "@angular/common";
import {VisibilityService} from "../../services/visibility.service";

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgStyle,
    NgClass
  ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent implements OnInit{
  private visibilityService = inject(VisibilityService);
  public isTechniqueActive = false;
  public isstaffActive = false;

  ngOnInit() {
    this.visibilityService.closePersonnel$.subscribe(() => {
      this.isstaffActive = false;
      document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
    });

    this.visibilityService.closeTechnique$.subscribe(() => {
      this.isTechniqueActive = false;
      document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
    });
  }
  showstaffTable(event: Event, elementId: string) {
    this.visibilityService.togglestaffVisibility(true);
    this.visibilityService.toggleTechniqueVisibility(false);

    if (this.isstaffActive) return;
    this.isstaffActive = !this.isstaffActive;
    this.isTechniqueActive = false;

    const target = document.getElementById(elementId);
    if (target) {
      document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
      target.classList.add('active');
    }
  }

  showTechniqueTable(event: Event, elementId: string) {
    this.visibilityService.toggleTechniqueVisibility(true);
    this.visibilityService.togglestaffVisibility(false);

    if (this.isTechniqueActive) return;
    this.isTechniqueActive = !this.isTechniqueActive;
    this.isstaffActive = false;

    const target = document.getElementById(elementId);
    if (target) {
      document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
      target.classList.add('active');
    }
  }
}
