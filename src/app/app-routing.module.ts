import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { BewerbungDetailComponent } from './components/bewerbung-detail/bewerbung-detail.component';
import { LoginComponent } from './components/login/login.component';
import { StudiengangOverviewComponent } from './components/studiengang-overview/studiengang-overview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/studiengang/1/bewerben',
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
    path: 'studiengang/:id/bewerben',
    component: BewerbungDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
