import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';
import { IonContent, IonHeader, IonCard, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonIcon, IonButton, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButton, RouterLink, IonContent, IonCard, IonHeader, IonTitle, IonToolbar, IonMenuButton, CommonModule, FormsModule, IonButtons],
})
export class InfoPage implements OnInit {

  constructor() {
    addIcons({ arrowBack });
  }

  ngOnInit() {
  }

}