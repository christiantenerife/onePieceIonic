import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/angular/standalone';
import { SagasService } from '../../core/services/sagas.service';
import { Saga } from '../../core/models/saga.model';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-SagasPage',
  templateUrl: 'sagas.page.html',
  styleUrls: ['sagas.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, RouterLink],
  standalone: true,
})
export class SagasPage {
  private sagasService = inject(SagasService);
  private cdr = inject(ChangeDetectorRef);

  apiSagas: Saga[] = [];
  loading = true;
  error = '' 

  constructor() {}

  cleanText(value: string | number | null | undefined): string {
  return String(value ?? '').replace(/à/gi, 'a');
}

  ngOnInit(): void {
    this.loadSagas();
  }

loadSagas(): void {
  console.log('Component loadSagas called');

  this.loading = true;
  this.error = '';

  this.sagasService.getSagas().subscribe({
    next: (data: Saga[]) => {
      console.log('Component NEXT', data.length);
      this.apiSagas = data;
      this.loading = false;
      this.cdr.detectChanges();
      console.log('loading:', this.loading, 'count:', this.apiSagas.length);
    },
    error: (err) => {
      console.log('Component ERROR', err);
      this.error = 'No se pudieron cargar las sagas.';
      this.loading = false;
    },
    complete: () => {
      console.log('Component COMPLETE');
    }
  });
}
}


function ngOnInit() {
  throw new Error('Function not implemented.');
}

