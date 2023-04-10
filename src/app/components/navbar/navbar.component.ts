import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

import { AccountComponent } from '../account/account.component';
import { LoginComponent } from '../login/login.component';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    public loggedIn: boolean = false;

    constructor(public dialog: MatDialog, private authService: AuthService) {
        authService.$loggedIn.subscribe(loggedIn => (this.loggedIn = loggedIn));
    }

    ngOnInit(): void {}

    public openLoginDialog(): void {
        let dialogRef = this.dialog.open(LoginComponent);
        dialogRef.afterClosed().subscribe();
    }
}
