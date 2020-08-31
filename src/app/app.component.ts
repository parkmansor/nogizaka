import { Component } from '@angular/core';
import { timeInterval } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  nowTime = new Date()

  constructor() {
    let id = setInterval(() => {
      this.nowTime = new Date()
    }, 1000)
  }
}
