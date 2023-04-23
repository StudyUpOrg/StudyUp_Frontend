import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { BewerbungStatusComponent } from './components/bewerbung-status/bewerbung-status.component';
import { BewerbungDetailComponent } from './components/bewerbung-detail/bewerbung-detail.component';
import { BewerbungOverviewComponent } from './components/bewerbung-overview/bewerbung-overview.component';
import { LoginComponent } from './components/login/login.component';
import { StudiengangDetailComponent } from './components/studiengang-detail/studiengang-detail.component';
import { StudiengangOverviewComponent } from './components/studiengang-overview/studiengang-overview.component';
import { EvaluationSheetCreationComponent } from './components/evaluation-sheet-creation/evaluation-sheet-creation.component';
import { BewerbungEvaluationComponent } from './components/bewerbung-evaluation/bewerbung-evaluation.component';
import { EvaluationSheetOverviewComponent } from './components/evaluation-sheet-overview/evaluation-sheet-overview.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/studiengang/übersicht',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'konto',
        component: AccountComponent,
    },
    {
        path: 'studiengang/übersicht',
        component: StudiengangOverviewComponent,
    },
    {
        path: 'bewerbung/:id/status',
        component: BewerbungStatusComponent,
    },
    {
        path: 'bewerbung/übersicht',
        component: BewerbungOverviewComponent,
    },
    {
        path: 'bewerbung/:id/bewertung',
        component: BewerbungEvaluationComponent,
    },
    {
        path: 'studiengang/:id/bewerben',
        component: BewerbungDetailComponent,
    },
    {
        path: 'studiengang/:id',
        component: StudiengangDetailComponent,
    },
    {
        path: 'evaluationsbogen/übersicht',
        component: EvaluationSheetOverviewComponent,
    },
    {
        path: 'evaluationsbogen/erstellen',
        component: EvaluationSheetCreationComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
