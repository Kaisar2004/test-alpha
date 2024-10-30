import {Component, inject, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {VisibilityService} from "../../services/visibility.service";
import {DataService} from "../../services/data.service";
import {DynamicDateService} from "../../services/dynamic-date.service";
import {Subscription} from "rxjs";

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
  public isVisible = false;

  private visibilityService = inject(VisibilityService);
  private dataService = inject(DataService);
  public technique = this.dataService.technique;

  formattedDate: string = '';
  private dynamicDateService = inject(DynamicDateService)
  private subscription!: Subscription;
  ngOnInit() {
    this.visibilityService.techniqueVisibility$.subscribe(isVisible => {
      this.isVisible = isVisible;
    });

    this.subscription = this.dynamicDateService.getDateObservable().subscribe(dateString => {
      this.formattedDate = dateString;
    });
  }

  hideTechniqueTable() {
    this.visibilityService.toggleTechniqueVisibility(false);
    this.visibilityService.closeTechnique();
  }
}
