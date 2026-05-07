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
              private personajesService: PersonajesService,
              private frutasService: FrutasService,
              private sagasService: SagasService,
  ) {}

  ionViewWillEnter() {
  const favoriteIds = this.favoritesService.getAllFavorites();

  this.favoritos = [];

  this.personajesService.getPersonajes().subscribe(personajes => {
    this.frutasService.getFrutas().subscribe(frutas => {
      this.sagasService.getSagas().subscribe(sagas => {

        favoriteIds.forEach(favorite => {
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
}