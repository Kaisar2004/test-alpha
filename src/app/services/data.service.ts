import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public staff = [
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
      fullName: "Новиков М.К",
      output: "Вентиляционный штрек",
      strongest: "А1-23416",
      timestamp: "20.12.2020 10:47:00",
    },
  ];

  public technique = [
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
  constructor() { }
}
