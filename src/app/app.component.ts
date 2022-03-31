import {
  Component
} from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'Module7UI';
  isScroll = false;

  constructor(public router: Router) {
  }

  onScrollEvent(event: Event): void {
    event.preventDefault();
    this.isScroll = window.scrollY > 1;
  }
}

