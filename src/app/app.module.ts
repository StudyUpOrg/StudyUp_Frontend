import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StudiengangDetailComponent } from './components/studiengang-detail/studiengang-detail.component';
import { StudiengangOverviewComponent } from './components/studiengang-overview/studiengang-overview.component';
import { AccountComponent } from './components/account/account.component';
import { BewerbungStatusComponent } from './components/bewerbung-status/bewerbung-status.component';
import { BewerbungDetailComponent } from './components/bewerbung-detail/bewerbung-detail.component';
import { BewerbungOverviewComponent } from './components/bewerbung-overview/bewerbung-overview.component';
import { EvaluationSheetCreationComponent } from './components/evaluation-sheet-creation/evaluation-sheet-creation.component';
import { BewerbungEvaluationComponent } from './components/bewerbung-evaluation/bewerbung-evaluation.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        StudiengangOverviewComponent,
        AccountComponent,
        BewerbungStatusComponent,
        BewerbungDetailComponent,
        BewerbungOverviewComponent,
        StudiengangDetailComponent,
        EvaluationSheetCreationComponent,
        BewerbungEvaluationComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatDialogModule,
        MatTableModule,
        MatIconModule,
        MatSnackBarModule,
        MatListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatSliderModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        {
            provide: MAT_DATE_LOCALE,
            useValue: 'de-DE',
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
