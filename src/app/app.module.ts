import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './materials/material/material.module';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { routes } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './shared/auth.service';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxLoadingComponent } from './shared/ngx-loading/ngx-loading.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    RouterModule.forRoot(routes,{useHash:true}),
    BrowserAnimationsModule,
    NgxLoadingModule.forRoot({}),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
