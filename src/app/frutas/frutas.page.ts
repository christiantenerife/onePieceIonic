import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-FrutasPage',
  templateUrl: 'frutas.page.html',
  styleUrls: ['frutas.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  standalone: true,
})
export class FrutasPage {

  constructor() {}

}
