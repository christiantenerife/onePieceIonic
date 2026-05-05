import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Fruta } from '../models/fruta.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FrutasService {
  private api = inject(ApiService);

 getFrutas(): Observable<Fruta[]> {
    console.log('Requesting frutas from API');

    return this.api.get<Fruta[]>('/fruits/en').pipe(
      tap({
        next: (data) => console.log('Service NEXT', data.length),
        error: (err) => console.log('Service ERROR', err),
        complete: () => console.log('Service COMPLETE')
      })
    );
  }
}