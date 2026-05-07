import { Component, inject } from '@angular/core';
import { IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonText,
  IonCard,
  IonRow,
  IonCol,
  IonCardHeader,
  IonMenuButton,
  IonCardTitle,
  IonButtons } from '@ionic/angular/standalone';
import { SagasService } from '../../core/services/sagas.service';
import { Saga } from '../../core/models/saga.model';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-SagasPage',
  templateUrl: 'sagas.page.html',
  styleUrls: ['sagas.page.scss'],
  imports: [IonToolbar, 
    IonTitle, 
    IonContent, 
    IonCard, 
    IonHeader,
    RouterLink,
    IonText,
    IonGrid,
    IonMenuButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonRow,
    IonButtons ],
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



