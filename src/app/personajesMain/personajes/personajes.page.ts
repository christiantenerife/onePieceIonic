import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/angular/standalone';
import { PersonajesService } from '../../core/services/personajes.service';
import { Personaje } from '../../core/models/personaje.model';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-PersonajesPage',
  templateUrl: 'personajes.page.html',
  styleUrls: ['personajes.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, RouterLink],
  standalone: true,
})
export class PersonajesPage {
  private personajesService = inject(PersonajesService);
  private cdr = inject(ChangeDetectorRef);

  apiPersonajes: Personaje[] = [];
  loading = true;
  error = '' 

  constructor() {}

  cleanText(value: string | number | null | undefined): string {
  return String(value ?? '').replace(/à/gi, 'a');
}

  ngOnInit(): void {
    this.loadPersonajes();
  }

loadPersonajes(): void {
  console.log('Component loadPersonajes called');

  this.loading = true;
  this.error = '';

  this.personajesService.getPersonajes().subscribe({
    next: (data: Personaje[]) => {
      console.log('Component NEXT', data.length);
      this.apiPersonajes = data;
      this.loading = false;
      this.cdr.detectChanges();
      console.log('loading:', this.loading, 'count:', this.apiPersonajes.length);
    },
    error: (err) => {
      console.log('Component ERROR', err);
      this.error = 'No se pudieron cargar los personajes.';
      this.loading = false;
    },
    complete: () => {
      console.log('Component COMPLETE');
    }
  });
}
}