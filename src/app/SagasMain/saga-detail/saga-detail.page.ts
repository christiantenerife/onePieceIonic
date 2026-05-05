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

import { SagasService } from '../../core/services/sagas.service';
import { Saga } from '../../core/models/saga.model';

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
    IonButtons,
    IonBackButton
  ],
})
export class SagaDetailPage {
  saga$: Observable<Saga | undefined>;

  constructor(
    public sagasService: SagasService,
    private route: ActivatedRoute
  ) {
    this.saga$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));

        return this.sagasService.getSagas().pipe(
          map(sagas => sagas.find(saga => saga.id === id))
        );
      })
    );
  }

  cleanText(value: string | number | null | undefined): string {
    return String(value ?? '').replace(/à/gi, 'a');
  }
}