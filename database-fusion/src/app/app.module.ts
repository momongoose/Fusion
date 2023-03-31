// hier drin befinden sich alle Module und Component imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StartComponent } from './start/start.component';
import { SearchComponent } from './search/search.component';
import { InfoComponent } from './info/info.component';
import {MatSelectModule} from '@angular/material/select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FrontComponent } from './front/front.component';
import { ErrorCheckComponent } from './error-check/error-check.component';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table'
import {MatSortModule} from '@angular/material/sort';
import { DisplayComponent } from './display/display.component';
import { AdminComponent } from './admin/admin.component';
import {MatCardModule} from '@angular/material/card';
import { AdminFComponent } from './admin-f/admin-f.component';
import { AdminSComponent } from './admin-s/admin-s.component';
import { AdminNComponent } from './admin-n/admin-n.component';
import { PositionComponent } from './position/position.component';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { SettingsComponent } from './settings/settings.component';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import {MatMenuModule} from '@angular/material/menu';
import { AdminAnalytikComponent } from './admin-analytik/admin-analytik.component';
import { AdminPraeComponent } from './admin-prae/admin-prae.component';
import { AdminFAnalytikComponent } from './admin-f-analytik/admin-f-analytik.component';
import { AdminFPraeComponent } from './admin-f-prae/admin-f-prae.component';
import { AdminSPraeComponent } from './admin-s-prae/admin-s-prae.component';
import { AdminSAnalytikComponent } from './admin-s-analytik/admin-s-analytik.component';
import { AdminNAnalytikComponent } from './admin-n-analytik/admin-n-analytik.component';
import { AdminNPraeComponent } from './admin-n-prae/admin-n-prae.component';
import { DisplayAnalytikComponent } from './display-analytik/display-analytik.component';
import { DisplayPraeComponent } from './display-prae/display-prae.component';
import { PositionAnalytikComponent } from './position-analytik/position-analytik.component';
import { PositionPraeComponent } from './position-prae/position-prae.component';
import { SettingsAnalytikComponent } from './settings-analytik/settings-analytik.component';
import { SettingsPraeComponent } from './settings-prae/settings-prae.component';
import { StatsComponent } from './stats/stats.component';
import { StatsAnalytikComponent } from './stats-analytik/stats-analytik.component';
import { StatsPraeComponent } from './stats-prae/stats-prae.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'stats', component: HomeComponent },
  { path: '', component: FrontComponent },
  { path: 'error',   component: ErrorCheckComponent},
  { path: 'display', component: DisplayComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'displayAnalytik', component: DisplayAnalytikComponent },
  { path: 'adminAnalytik', component: AdminAnalytikComponent },
  { path: 'displayPraeanalytik', component: DisplayPraeComponent },
  { path: 'adminPraeanalytik', component: AdminPraeComponent },
  { path: 'statsPooling', component: StatsComponent },
  { path: 'statsAnalytik', component: StatsAnalytikComponent },
  { path: 'statsPraeanalytik', component: StatsPraeComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    StartComponent,
    SearchComponent,
    InfoComponent,
    FrontComponent,
    ErrorCheckComponent,
    DisplayComponent,
    AdminComponent,
    AdminFComponent,
    AdminSComponent,
    AdminNComponent,
    PositionComponent,
    SettingsComponent,
    AdminAnalytikComponent,
    AdminPraeComponent,
    AdminFAnalytikComponent,
    AdminFPraeComponent,
    AdminSPraeComponent,
    AdminSAnalytikComponent,
    AdminNAnalytikComponent,
    AdminNPraeComponent,
    DisplayAnalytikComponent,
    DisplayPraeComponent,
    PositionAnalytikComponent,
    PositionPraeComponent,
    SettingsAnalytikComponent,
    SettingsPraeComponent,
    StatsComponent,
    StatsAnalytikComponent,
    StatsPraeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatTabsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    NgxChartsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatRippleModule,
    MatPaginatorModule,
    MatRadioModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatToolbarModule,
    DragDropModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    NgxMatTimepickerModule,
    MatMenuModule
  ],
  exports: [RouterModule],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'de-DE' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
