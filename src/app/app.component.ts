import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonApp, 
        IonMenu,
        IonList,
        IonItem,
        IonToolbar,
        IonMenuToggle,
        IonContent,
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
        IonMenuToggle,
        IonRouterOutlet, 
        RouterLink,
        IonTitle],
})
export class AppComponent {

   menuItems = [
    { title: 'Inicio', path: '/home' },
    { title: 'Personajes', path: '/tabs/personajes' },
    { title: 'Frutas', path: '/tabs/frutas' },
    { title: 'Sagas', path: '/tabs/sagas' },
    { title: 'Favoritos', path: '/favoritos' },
    { title: 'Sobre', path: '/info' }
  ];
  constructor() {}
}
