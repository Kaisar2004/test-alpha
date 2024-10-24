import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AsideComponent} from "./components/aside/aside.component";
import {StuffTableComponent} from "./components/stuff-table/stuff-table.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsideComponent, StuffTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
