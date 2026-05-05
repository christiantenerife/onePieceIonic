import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Saga } from '../models/saga.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SagasService {
  private api = inject(ApiService);

 getSagas(): Observable<Saga[]> {
    console.log('Requesting sagas from API');

    return this.api.get<Saga[]>('/sagas/en').pipe(
      tap({
        next: (data) => console.log('Service NEXT', data.length),
        error: (err) => console.log('Service ERROR', err),
        complete: () => console.log('Service COMPLETE')
      })
    );
  }
}