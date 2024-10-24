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
    this.visibilityService.toggleVisibility(true);
  }
}
