import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';


@Component({
  selector: 'app-PersonajesPage',
  templateUrl: 'personajes.page.html',
  styleUrls: ['personajes.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  standalone: true,
})
export class PersonajesPage {
  constructor() {}
}
