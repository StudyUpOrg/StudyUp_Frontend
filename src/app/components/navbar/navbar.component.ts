import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public openLoginDialog(): void {
    console.log("popup");
    let dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe();
  }

}
