import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studiengang-overview',
  templateUrl: './studiengang-overview.component.html',
  styleUrls: ['./studiengang-overview.component.scss'],
})
export class StudiengangOverviewComponent {
  public loggedIn: boolean = false;
  public displayedColumns: string[];
  public dataSource = [
    {
      title: 'Toller Studiengang',
      degree: 'Bachelor',
      startDate: new Date(2023, 2, 3),
      active: false,
      id: 1,
    },
  ];

  constructor() {
    if (this.loggedIn) {
      this.displayedColumns = ['title', 'degree', 'startDate', 'active', 'id'];
    } else {
      this.displayedColumns = ['title', 'degree', 'startDate', 'id'];
    }
  }
}
