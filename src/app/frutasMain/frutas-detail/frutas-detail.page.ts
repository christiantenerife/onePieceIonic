import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable, map, switchMap } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';

import { FrutasService } from '../../core/services/frutas.service';
import { Fruta } from '../../core/models/fruta.model';

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
    IonBackButton
  ],
})
export class FrutasDetailPage {
  fruta$: Observable<Fruta | undefined>;

  constructor(
    public frutasService: FrutasService,
    private route: ActivatedRoute
  ) {
    this.fruta$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));

        return this.frutasService.getFrutas().pipe(
          map(frutas => frutas.find(fruta => fruta.id === id))
        );
      })
    );
  }

  cleanText(value: string | number | null | undefined): string {
    return String(value ?? '').replace(/à/gi, 'a');
  }
}