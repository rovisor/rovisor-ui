import { Component } from '@angular/core';

@Component({
  selector: 'application-root',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent {
  title = 'rovisor-ui';
  year = new Date().getFullYear();
  version = "0.0.28";
}
