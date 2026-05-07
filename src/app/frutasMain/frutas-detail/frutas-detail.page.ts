import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, map, switchMap, tap } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonCard,
  IonMenuButton,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, heartOutline, arrowBack } from 'ionicons/icons';

import { FrutasService } from '../../core/services/frutas.service';
import { Fruta } from '../../core/models/fruta.model';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-frutas-detail',
  templateUrl: './frutas-detail.page.html',
  styleUrls: ['./frutas-detail.page.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonCard,
    IonIcon,
    RouterLink,
    IonMenuButton,
  ],
})
export class FrutasDetailPage {
  fruta$: Observable<Fruta | undefined>;
  isFavorite = false;

  constructor(
    public frutasService: FrutasService,
    private route: ActivatedRoute,
    private favoritesService: FavoritesService
  ) {
    addIcons({ heart, heartOutline, arrowBack });
    this.fruta$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));

        return this.frutasService.getFrutas().pipe(
          map(frutas => frutas.find(fruta => fruta.id === id)),
          tap(fruta => {
            if (fruta?.id) {
              this.isFavorite = this.favoritesService.isFavorite('fruta', fruta.id);
            }
          })
        );
      })
    );
  }

  toggleFavorite(fruta: Fruta) {
      this.isFavorite = this.favoritesService.toggleFavorite('fruta', fruta.id);
    }

  cleanText(value: string | number | null | undefined): string {
    return String(value ?? '').replace(/à/gi, 'a');
  }
}