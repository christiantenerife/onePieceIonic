import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';
import { Personaje } from '../models/personaje.model';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {
  private api = inject(ApiService);

 getPersonajes(): Observable<Personaje[]> {
    console.log('Requesting personajes from API');

    return this.api.get<Personaje[]>('/characters/en').pipe(
      tap({
        next: (data) => console.log('Service NEXT', data.length),
        error: (err) => console.log('Service ERROR', err),
        complete: () => console.log('Service COMPLETE')
      })
    );
  }
}