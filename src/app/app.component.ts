import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AsideComponent} from "./components/aside/aside.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsideComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-alpha';
}
