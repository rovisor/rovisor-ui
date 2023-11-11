import { Component } from '@angular/core';
import { faTwitter, faGithub, faLinkedin, faDiscord, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rovisor-ui';
  faGithub = faGithub;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faDiscord = faDiscord; 
  faInstagram = faInstagram;
  year = new Date().getFullYear();
  version = "0.0.28";
}
