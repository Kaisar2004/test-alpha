import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {VisibilityService} from "../../services/visibility.service";

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  private visibilityService = inject(VisibilityService);

  showStuffTable() {
    this.visibilityService.toggleStuffVisibility(true);  // Только персонал
    this.visibilityService.toggleTechniqueVisibility(false); // Скрыть технику
  }

  showTechniqueTable() {
    this.visibilityService.toggleTechniqueVisibility(true);  // Только техника
    this.visibilityService.toggleStuffVisibility(false); // Скрыть персонал
  }
}
