import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonText,
  IonCard,
  IonRow,
  IonCol,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { FrutasService } from '../../core/services/frutas.service';
import { Fruta } from '../../core/models/fruta.model';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-FrutasPage',
  templateUrl: 'frutas.page.html',
  styleUrls: ['frutas.page.scss'],
  imports: [IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonCard, 
    RouterLink,
    IonText,
    IonGrid,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCol,
    IonRow  
  ],
  standalone: true,
})
export class FrutasPage {
  private frutasService = inject(FrutasService);
  private cdr = inject(ChangeDetectorRef);

  apiFrutas: Fruta[] = [];
  loading = true;
  error = '' 

  constructor() {}

  cleanText(value: string | number | null | undefined): string {
  return String(value ?? '').replace(/à/gi, 'a');
}

  ngOnInit(): void {
    this.loadFrutas();
  }

loadFrutas(): void {
  console.log('Component loadFrutas called');

  this.loading = true;
  this.error = '';

  this.frutasService.getFrutas().subscribe({
    next: (data: Fruta[]) => {
      console.log('Component NEXT', data.length);
      this.apiFrutas = data;
      this.loading = false;
      this.cdr.detectChanges();
      console.log('loading:', this.loading, 'count:', this.apiFrutas.length);
      this.apiFrutas.sort((a, b) => Number(!!b.filename) - Number(!!a.filename));
    },
    error: (err) => {
      console.log('Component ERROR', err);
      this.error = 'No se pudieron cargar las frutas.';
      this.loading = false;
    },
    complete: () => {
      console.log('Component COMPLETE');
    }
  });
}
}


// function ngOnInit() {
//   throw new Error('Function not implemented.');
// }

