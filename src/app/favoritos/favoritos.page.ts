import { Component } from '@angular/core';
import { FavoritesService } from '../core/services/favorites.service';
import { PersonajesService } from '../core/services/personajes.service';
import { FrutasService } from '../core/services/frutas.service';
import { SagasService } from '../core/services/sagas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IonHeader,IonGrid, IonCard,IonRow, IonCardHeader,IonTitle, IonCardTitle, IonToolbar, IonButtons, IonMenuButton, IonContent, IonCol, IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonCol, IonCard, IonCardHeader, IonCardTitle, IonRow, IonGrid,  IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, RouterLink, IonContent],
})
export class FavoritosPage  {
  favoritos: any[] = [];
  loading = true;
  error = '';

  constructor(private favoritesService: FavoritesService,
              private personajesService: PersonajesService, // inyecta el servicio de personajes, me permite hacer peticiones para obtener los personajes favoritos, por ejemplo: this.personajesService.getPersonajes()
              private frutasService: FrutasService,
              private sagasService: SagasService,
  ) {}

  ionViewWillEnter() {

  // parecido a ngOnInit, pero se ejecuta cada vez
  // que se entra a la página

  this.loading = true;
  this.error = '';

  const favoriteIds = this.favoritesService.getAllFavorites();

  this.favoritos = [];

  forkJoin({

    personajes: this.personajesService.getPersonajes(),

    frutas: this.frutasService.getFrutas(),

    sagas: this.sagasService.getSagas()

  }).subscribe({

    next: ({ personajes, frutas, sagas }) => {

      favoriteIds.forEach(favorite => {

        const [type, id] = favorite.split('-');

        if (type === 'personaje') {

          const personaje = personajes.find(
            p => p.id === Number(id)
          );

          if (personaje) {

            this.favoritos.push({
              type: 'personaje',
              data: personaje
            });

          }
        }

        if (type === 'fruta') {

          const fruta = frutas.find(
            f => f.id === Number(id)
          );

          if (fruta) {

            this.favoritos.push({
              type: 'fruta',
              data: fruta
            });

          }
        }

        if (type === 'saga') {

          const saga = sagas.find(
            s => s.id === Number(id)
          );

          if (saga) {

            this.favoritos.push({
              type: 'saga',
              data: saga
            });

          }
        }

      });

      this.loading = false;

    },

    error: () => {

      this.error = 'No se pudieron cargar los favoritos.';
      this.loading = false;

    }

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