import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonApp, 
        IonMenu,
        IonList,
        IonToolbar,
        IonContent,
        IonItem,
        IonHeader, 
        IonRouterOutlet, 
        IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [ IonApp, 
        IonMenu,
        IonList,
        IonItem,
        IonHeader,
        IonToolbar,
        IonContent, 
        IonRouterOutlet, 
        RouterLink,
        IonTitle],
})
export class AppComponent {
  constructor() {}
}
