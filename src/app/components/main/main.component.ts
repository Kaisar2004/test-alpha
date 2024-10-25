import {Component, inject, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {VisibilityService} from "../../services/visibility.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    NgIf,
    NgClass
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  public messages = [
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
  public devices = [
    {
      image: "../../../assets/images/SignalC-2.png",
      name: "C219-00001",
    },
    {
      image: "../../../assets/images/SignalA-2.png",
      name: "A55-12345",
    },
    {
      image: "../../../assets/images/Sensor-1.png",
      name: "Датчик №83, Sentro 8",
    },
    {
      image: "../../../assets/images/SignalC-2.png",
      name: "C219-00003",
    },
  ];

  public isMessageVisible = false;
  public isDeviceVisible = false;
  public isMessageActive = false;
  public isDeviceActive = false;

  private visibilityService = inject(VisibilityService);

  ngOnInit() {
    this.visibilityService.messageVisibility$.subscribe(isVisible => {
      this.isMessageVisible = isVisible;
    });

    this.visibilityService.deviceVisibility$.subscribe(isVisible => {
      this.isDeviceVisible = isVisible;
    });

    this.visibilityService.closeMessage$.subscribe(() => {
      console.log('closeMessage$ triggered');

      this.isMessageActive = false;
      document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.no-hover').forEach(el => el.classList.remove('no-hover'));
    });

    this.visibilityService.closeDevice$.subscribe(() => {
      console.log('closeDevice$ triggered');
      this.isDeviceActive = false;
      document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.no-hover').forEach(el => el.classList.remove('no-hover'));
    });
  }

  showMessageWindow(event: Event, elementId: string) {
    this.visibilityService.toggleMessageVisibility(true);
    this.visibilityService.toggleDeviceVisibility(false);

    if(this.isMessageActive) return;
    this.isMessageActive = !this.isMessageActive;
    this.isDeviceActive = false;

    const target = document.getElementById(elementId);
    if (target) {
      document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
      target.classList.add('active', 'no-hover');
    }
  }

  showDeviceWindow(event: Event, elementId: string) {
    this.visibilityService.toggleDeviceVisibility(true);
    this.visibilityService.toggleMessageVisibility(false);

    if(this.isDeviceActive) return;
    this.isDeviceActive = !this.isDeviceActive;
    this.isMessageActive = false;

    const target = document.getElementById(elementId);
    if (target) {
      document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
      target.classList.add('active', 'no-hover');
    }
  }
  hideMessage() {
    this.visibilityService.toggleMessageVisibility(false);
    this.visibilityService.closeMessage();
  }
  hideDevice() {
    this.visibilityService.toggleDeviceVisibility(false);
    this.visibilityService.closeDevice();
  }
}
