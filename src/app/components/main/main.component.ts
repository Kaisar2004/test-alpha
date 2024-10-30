import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {VisibilityService} from "../../services/visibility.service";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import Map from 'ol/Map';
import {Feature, MapBrowserEvent, View} from "ol";
import {fromLonLat} from "ol/proj";
import {Icon, Style} from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Geometry, Point} from "ol/geom";
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
  private staffMarkerFeatures: Feature[] = [];
  private techniqueMarkerFeatures: Feature[] = [];
  private markerInterval: any;

  @ViewChild('mapContainer', {static: true}) mapContainer!: ElementRef;


  private initializeMap(): void {
    const markerSourceStaff = new VectorSource();
    const markerSourceTechnique = new VectorSource();

    this.dataService.staff.forEach((_, index) => {
      const markerFeature = new Feature({
        geometry: new Point(fromLonLat([2.3522 + (index * 0.01), 48.8566]))
      });
      this.staffMarkerFeatures.push(markerFeature);
      markerSourceStaff.addFeature(markerFeature);
    });

    this.dataService.technique.forEach((_, index) => {
      const markerFeature = new Feature({
        geometry: new Point(fromLonLat([2.3542 + (index * 0.01), 48.8580]))
      });
      this.techniqueMarkerFeatures.push(markerFeature);
      markerSourceTechnique.addFeature(markerFeature);
    });

    const staffMarkerLayer = new VectorLayer({
      source: markerSourceStaff,
      style: new Style({
        image: new Icon({
          src: 'https://i.imgur.com/9QGehBP.png',
          anchor: [0.5, 1],
          scale: 0.1
        })
      })
    });

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

    this.map?.on('click', (event: MapBrowserEvent<any>) => {
      this.map?.forEachFeatureAtPixel(event.pixel, (featureLike) => {
        const feature = featureLike as Feature<Geometry>; // Приведение типа

        if (this.staffMarkerFeatures.includes(feature) || this.techniqueMarkerFeatures.includes(feature)) {
          const isTechniqueMarker = this.techniqueMarkerFeatures.includes(feature);

          feature.setStyle(
            new Style({
              image: new Icon({
                src: isTechniqueMarker ? 'https://i.imgur.com/aYj6dxJ.png' : 'https://i.imgur.com/9QGehBP.png',
                anchor: [0.5, 1],
                scale: 0.15,
              }),
            })
          );

          // Сбрасываем стиль маркера через определенное время (2 секунды)
          setTimeout(() => {
            feature.setStyle(
              new Style({
                image: new Icon({
                  src: isTechniqueMarker ? 'https://i.imgur.com/aYj6dxJ.png' : 'https://i.imgur.com/9QGehBP.png',
                  anchor: [0.5, 1],
                  scale: 0.1,
                }),
              })
            );
          }, 2000);
        }
      });
    });
  };

  private startMarkerMovement(): void {
    setInterval(() => {
      this.staffMarkerFeatures.forEach((markerFeature) => {
        const currentCoords = (markerFeature.getGeometry() as Point).getCoordinates();
        const newCoords = [
          currentCoords[0] + (Math.random() - 0.5) * 500,
          currentCoords[1] + (Math.random() - 0.5) * 500,
        ];
        (markerFeature.getGeometry() as Point).setCoordinates(newCoords);
      });

      this.techniqueMarkerFeatures.forEach((markerFeature) => {
        const currentCoords = (markerFeature.getGeometry() as Point).getCoordinates();
        const newCoords = [
          currentCoords[0] + (Math.random() - 0.5) * 500,
          currentCoords[1] + (Math.random() - 0.5) * 500,
        ];
        (markerFeature.getGeometry() as Point).setCoordinates(newCoords);
      });
    }, 5000);
  }
}
