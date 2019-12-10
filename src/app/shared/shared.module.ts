import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSidenavModule, MatListModule, MatDatepickerModule, MatSelectModule, MatBadgeModule, MatNativeDateModule, MatCalendarHeader, MAT_DATE_LOCALE } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    MatSelectModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatCardModule
  ],
  exports:[
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    MatSelectModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}]
})
export class SharedModule { }
