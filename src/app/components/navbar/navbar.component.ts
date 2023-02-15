import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountComponent } from '../account/account.component';

import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean = true;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public openLoginDialog(): void {
    let dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe();
  }

  public openAccountDialog(): void {
    let dialogRef = this.dialog.open(AccountComponent);
    dialogRef.afterClosed().subscribe();
  }
}
