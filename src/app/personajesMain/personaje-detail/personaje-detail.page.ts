import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable, map, switchMap, tap } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonCard,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { heart, heartOutline, arrowBack } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { PersonajesService } from '../../core/services/personajes.service';
import { Personaje } from '../../core/models/personaje.model';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-personaje-detail',
  templateUrl: './personaje-detail.page.html',
  styleUrls: ['./personaje-detail.page.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonIcon,
    IonCard,
    RouterLink
  ],
})
export class PersonajeDetailPage {
  personaje$: Observable<Personaje | undefined>;
  isFavorite = false;

  constructor(
    public personajesService: PersonajesService,
    private route: ActivatedRoute,
    private favoritesService: FavoritesService
  ) {
    addIcons({ heart, heartOutline, arrowBack });

    this.personaje$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));

        return this.personajesService.getPersonajes().pipe(
          map(personajes => personajes.find(personaje => personaje.id === id)),
          tap(personaje => {
            if (personaje?.id) {
              this.isFavorite = this.favoritesService.isFavorite('personaje', personaje.id);
            }
          })
        );
      })
    );
  }

  toggleFavorite(personaje: Personaje) {
    this.isFavorite = this.favoritesService.toggleFavorite('personaje', personaje.id);
  }

  cleanText(value: string | number | null | undefined): string {
    return String(value ?? '').replace(/à/gi, 'a');
  }
}