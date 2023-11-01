import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeathercomponentComponent } from './weathercomponent/weathercomponent.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FooterComponent } from './footer/footer.component';
//import { MapmyindiaComponent } from './mapmyindia/mapmyindia.component';
import {
  MatDialogModule,
} from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';

@NgModule({
  declarations: [AppComponent, WeathercomponentComponent, FooterComponent, DialogExampleComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,MatDialogModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
