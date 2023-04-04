import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bewerbung-status',
  templateUrl: './bewerbung-status.component.html',
  styleUrls: ['./bewerbung-status.component.scss']
})
export class BewerbungStatusComponent implements OnInit {
  public dataSource = [{
    title: 'Toller Studiengang',
    firstName: 'Patrick',
    lastName: 'Münster',
    status: 'in Bearbeitung'
  }];
  public displayedColumns = ['title', 'firstName', 'lastName', 'status'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
