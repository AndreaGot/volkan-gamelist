import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';


// UI
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatDividerModule} from '@angular/material/divider';
import { LayoutModule } from '@angular/cdk/layout'
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    GameComponent
  ],
  imports: [
    AppRoutingModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
