import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-fd053","appId":"1:386478483427:web:1af0362f3c5ad1b6e122d6","storageBucket":"ring-of-fire-fd053.appspot.com","apiKey":"AIzaSyAB1KyDILGJ0GWDHh0-lGb_yG-x_v3R0nc","authDomain":"ring-of-fire-fd053.firebaseapp.com","messagingSenderId":"386478483427"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
