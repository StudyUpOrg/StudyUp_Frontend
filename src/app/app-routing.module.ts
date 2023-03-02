import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/login/login.component';
import { StudiengangDetailComponent } from './components/studiengang-detail/studiengang-detail.component';
import { StudiengangOverviewComponent } from './components/studiengang-overview/studiengang-overview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/studiengang/detail/1',
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
    path: 'studiengang/detail/:id',
    component: StudiengangDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
