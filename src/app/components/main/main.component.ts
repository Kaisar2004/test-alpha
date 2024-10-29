import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {VisibilityService} from "../../services/visibility.service";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import Map from 'ol/Map';
import {Feature, View} from "ol";
import {fromLonLat} from "ol/proj";
import {Icon, Style} from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Point} from "ol/geom";
import {DataService} from "../../services/data.service";

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
export class MainComponent implements OnInit {
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
  private dataService = inject(DataService);

  ngOnInit() {
    this.initializeMap();
    this.startMarkerMovement();
    console.log(this.staffMarkerFeature);
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

    if (this.isMessageActive) return;
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

    if (this.isDeviceActive) return;
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

  private map: Map | undefined;
  private staffMarkerFeature!: Feature;
  private techniqueMarkerFeature!: Feature;
  private markerInterval: any;

  @ViewChild('mapContainer', {static: true}) mapContainer!: ElementRef;

  // private initializeMap(): void {
  //   this.markerFeature1 = new Feature({
  //     geometry: new Point(fromLonLat([2.3522, 48.8566]))
  //   });
  //   this.markerFeature2 = new Feature({
  //     geometry: new Point(fromLonLat([2.3530, 48.8550]))
  //   });
  //
  //   // https://i.imgur.com/aYj6dxJ.png техника
  //   const markerLayer = new VectorLayer({
  //     source: new VectorSource({
  //       features: [this.markerFeature1, this.markerFeature2]
  //     }),
  //     style: new Style({
  //       image: new Icon({
  //         src: 'https://i.imgur.com/9QGehBP.png',
  //         anchor: [0.5, 1],
  //         scale: 0.1
  //       })
  //     })
  //   });
  //   const markerLayer2 = new VectorLayer({
  //     source: new VectorSource({
  //       features: [this.markerFeature2]
  //     }),
  //     style: new Style({
  //       image: new Icon({
  //         src: 'https://i.imgur.com/aYj6dxJ.png',
  //         anchor: [0.5, 1],
  //         scale: 0.1
  //       })
  //     })
  //   });
  //
  //   this.map = new Map({
  //     target: this.mapContainer.nativeElement,
  //     layers: [
  //       new TileLayer({
  //         source: new OSM()
  //       }),
  //       markerLayer, markerLayer2
  //     ],
  //     view: new View({
  //       center: fromLonLat([2.3522, 48.8566]), // Начальная точка на карте
  //       zoom: 14
  //     }),
  //   });
  // };
  private initializeMap(): void {
    const markerSourcestaff = new VectorSource();
    const markerSourceTechnique = new VectorSource();

    this.dataService.staff.forEach((_, index) => {
      this.staffMarkerFeature = new Feature({
        geometry: new Point(fromLonLat([2.3522 + (index * 0.01), 48.8566])) // Корректируем координаты для примера
      });
      markerSourcestaff.addFeature(this.staffMarkerFeature);
    });

    this.dataService.technique.forEach((_, index) => {
      this.techniqueMarkerFeature = new Feature({
        geometry: new Point(fromLonLat([2.3600 + (index * 0.01), 48.8600])) // Корректируем координаты для примера
      });
      markerSourceTechnique.addFeature(this.techniqueMarkerFeature);
    });

    const staffMarkerLayer = new VectorLayer({
      source: markerSourcestaff,
      style: new Style({
        image: new Icon({
          src: 'https://i.imgur.com/9QGehBP.png',
          anchor: [0.5, 1],
          scale: 0.1
        })
      })
    });// Устанавливаем слой с маркерами
    const techniqueMarkerLayer = new VectorLayer({
      source: markerSourceTechnique,
      style: new Style({
        image: new Icon({
          src: 'https://i.imgur.com/aYj6dxJ.png',
          anchor: [0.5, 1],
          scale: 0.1
        })
      })
    });

    // Инициализируем карту с добавлением слоя маркеров
    this.map = new Map({
      target: this.mapContainer.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        staffMarkerLayer, techniqueMarkerLayer
      ],
      view: new View({
        center: fromLonLat([2.3522, 48.8566]),
        zoom: 14
      }),
    });
  };

  private startMarkerMovement(): void {
    this.markerInterval = setInterval(() => {
      const currentCoords1 = (this.staffMarkerFeature.getGeometry() as Point).getCoordinates();
      const currentCoords2 = (this.techniqueMarkerFeature.getGeometry() as Point).getCoordinates();

      const newCoords1 = [
        currentCoords1[0] + (Math.random() - 0.5) * 500,
        currentCoords1[1] + (Math.random() - 0.5) * 500,
      ];
      const newCoords2 = [
        currentCoords2[0] + (Math.random() - 0.5) * 500,
        currentCoords2[1] + (Math.random() - 0.5) * 500,
      ];

      (this.staffMarkerFeature.getGeometry() as Point)?.setCoordinates(newCoords1);
      (this.techniqueMarkerFeature.getGeometry() as Point)?.setCoordinates(newCoords2);
    }, 5000);
  }
}
