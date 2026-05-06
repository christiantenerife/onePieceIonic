import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable, map, switchMap, tap } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonIcon,
  IonCard,
  IonButton,
} from '@ionic/angular/standalone';

import { SagasService } from '../../core/services/sagas.service';
import { Saga } from '../../core/models/saga.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline, arrowBack } from 'ionicons/icons';
@Component({
  selector: 'app-saga-detail',
  templateUrl: './saga-detail.page.html',
  styleUrls: ['./saga-detail.page.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonIcon,
  IonCard,
  IonButton,
  ],
})
export class SagaDetailPage {
  saga$: Observable<Saga | undefined>;
  isFavorite = false;

  constructor(
    public sagasService: SagasService,
    private route: ActivatedRoute,
    private favoritesService: FavoritesService
  ) {
    addIcons({ heart, heartOutline, arrowBack });

    this.saga$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));

        return this.sagasService.getSagas().pipe(
          map(sagas => sagas.find(saga => saga.id === id)),
          tap(saga => {
            if (saga?.id) {
              this.isFavorite = this.favoritesService.isFavorite('saga', saga.id);
            }
          })
        );
      })
    );
  }
toggleFavorite(saga: Saga) {
    this.isFavorite = this.favoritesService.toggleFavorite('saga', saga.id);
}
  cleanText(value: string | number | null | undefined): string {
    return String(value ?? '').replace(/à/gi, 'a');
  }
}