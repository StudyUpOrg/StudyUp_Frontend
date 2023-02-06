import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StudiengangOverviewComponent } from './components/studiengang-overview/studiengang-overview.component';

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
    path: 'studiengang/übersicht',
    component: StudiengangOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
