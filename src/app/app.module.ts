import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DownloadItemComponent } from './components/download-item/download-item.component'

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';


const materialImportExport = [
  MatProgressBarModule,
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatIconModule,
];

@NgModule({
  declarations: [
    AppComponent,
    DownloadItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...materialImportExport,
  ],
  exports: [
    ...materialImportExport,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
