import { Component } from '@angular/core';
import { IonApp, IonHeader, IonToolbar, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonHeader, IonToolbar, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
