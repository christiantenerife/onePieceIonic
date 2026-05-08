import { Component } from '@angular/core';
import { FavoritesService } from '../core/services/favorites.service';
import { PersonajesService } from '../core/services/personajes.service';
import { FrutasService } from '../core/services/frutas.service';
import { SagasService } from '../core/services/sagas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonHeader,IonGrid, IonCard,IonRow, IonCardHeader,IonTitle, IonCardTitle, IonToolbar, IonButtons, IonMenuButton, IonContent, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [IonCol, IonCard, IonCardHeader, IonCardTitle, IonRow, IonGrid,  IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, RouterLink, IonContent],
})
export class FavoritosPage  {
  favoritos: any[] = [];

  constructor(private favoritesService: FavoritesService,
              private personajesService: PersonajesService, // inyecta el servicio de personajes, me permite hacer peticiones para obtener los personajes favoritos, por ejemplo: this.personajesService.getPersonajes()
              private frutasService: FrutasService,
              private sagasService: SagasService,
  ) {}

  ionViewWillEnter() { //parecido an ngOninit, pero se ejecuta cada vez que se entra a la página, no solo la primera vez que se carga, es ideal para cargar datos que pueden cambiar, como los favoritos
  const favoriteIds = this.favoritesService.getAllFavorites(); // obtiene los ids de los favoritos, por ejemplo: ['personaje-1', 'fruta-2', 'saga-3']

  this.favoritos = []; // limpia el array de favoritos para cargar los datos actualizados

  this.personajesService.getPersonajes().subscribe(personajes => { // hace una petición para obtener todos los personajes, y se suscribe a la respuesta, que es un array de personajes, por ejemplo: [{id: 1, name: 'Luffy'}, {id: 2, name: 'Zoro'}, ...]
    this.frutasService.getFrutas().subscribe(frutas => {
      this.sagasService.getSagas().subscribe(sagas => {

        favoriteIds.forEach(favorite => { // recorre cada id de favorito, por ejemplo: 'personaje-1'
          const [type, id] = favorite.split('-');

          if (type === 'personaje') {
            const personaje = personajes.find(p => p.id === Number(id));

            if (personaje) {
              this.favoritos.push({
                type: 'personaje',
                data: personaje
              });
            }
          }

          if (type === 'fruta') {
            const fruta = frutas.find(f => f.id === Number(id));

            if (fruta) {
              this.favoritos.push({
                type: 'fruta',
                data: fruta
              });
            }
          }

          if (type === 'saga') {
            const saga = sagas.find(s => s.id === Number(id));

            if (saga) {
              this.favoritos.push({
                type: 'saga',
                data: saga
              });
            }
          }
        });

      });
    });
  });
}

getFavoriteLink(favorito: any): any[] {

    if (favorito.type === 'personaje') {
      return ['/tabs/personajes', favorito.data.id];
    }

    if (favorito.type === 'fruta') {
      return ['/tabs/frutas', favorito.data.id];
    }

    if (favorito.type === 'saga') {
      return ['/tabs/sagas', favorito.data.id];
    }

    return ['/favoritos'];
  }
}