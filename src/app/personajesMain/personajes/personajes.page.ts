import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  IonMenuButton,
  IonCardTitle,
  IonSearchbar,
  IonButtons
} from '@ionic/angular/standalone';

import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { PersonajesService } from '../../core/services/personajes.service';
import { Personaje } from '../../core/models/personaje.model';

@Component({
  selector: 'app-PersonajesPage',
  templateUrl: 'personajes.page.html',
  styleUrls: ['personajes.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonSearchbar,
    IonButtons,
    IonMenuButton,
  ],
})
export class PersonajesPage {
  private personajesService = inject(PersonajesService);
  private cdr = inject(ChangeDetectorRef);

  apiPersonajes: Personaje[] = [];
  loading = true;
  error = '';

  searchTerm = '';

ngOnInit(): void {
  this.loadPersonajes();
}

onSearch(event: any): void {
  this.searchTerm = event.detail.value?.toLowerCase().trim() || '';
}

get filteredPersonajes(): Personaje[] {
  if (!this.searchTerm) {
    return this.apiPersonajes;
  }

  return this.apiPersonajes.filter(personaje =>
    personaje.name?.toLowerCase().includes(this.searchTerm)
  );
}

cleanText(value: string | number | null | undefined): string {
  return String(value ?? '').replace(/à/gi, 'a');
}

  loadPersonajes(): void {
    this.loading = true;
    this.error = '';

    this.personajesService.getPersonajes().subscribe({
      next: (data: Personaje[]) => {
        this.apiPersonajes = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudieron cargar los personajes.';
        this.loading = false;
      }
    });
  }
}