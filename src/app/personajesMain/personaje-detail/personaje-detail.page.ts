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

import { PersonajesService } from '../../core/services/personajes.service';
import { Personaje } from '../../core/models/personaje.model';

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
    IonButtons,
    IonBackButton
  ],
})
export class PersonajeDetailPage {
  personaje$: Observable<Personaje | undefined>;

  constructor(
    public personajesService: PersonajesService,
    private route: ActivatedRoute
  ) {
    this.personaje$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));

        return this.personajesService.getPersonajes().pipe(
          map(personajes => personajes.find(personaje => personaje.id === id))
        );
      })
    );
  }

  cleanText(value: string | number | null | undefined): string {
    return String(value ?? '').replace(/à/gi, 'a');
  }
}