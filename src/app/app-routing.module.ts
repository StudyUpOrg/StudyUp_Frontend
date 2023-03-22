import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { BewerbungDetailComponent } from './components/bewerbung-detail/bewerbung-detail.component';
import { BewerbungOverviewComponent } from './components/bewerbung-overview/bewerbung-overview.component';
import { LoginComponent } from './components/login/login.component';
import { StudiengangDetailComponent } from './components/studiengang-detail/studiengang-detail.component';
import { StudiengangOverviewComponent } from './components/studiengang-overview/studiengang-overview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/bewerbung/übersicht',
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
    path: 'studiengang/detail/:id/bewerben',
    component: BewerbungDetailComponent
  },
  {
    path: 'studiengang/detail/:id',
    component: StudiengangDetailComponent,
  },
  {
    path: 'bewerbung/übersicht',
    component: BewerbungOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
