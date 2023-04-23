import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

import { LoginComponent } from '../login/login.component';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    public loggedIn: boolean = false;

    constructor(public dialog: MatDialog, private authService: AuthService) {
        this.authService.$loggedIn.subscribe(loggedIn => {
            this.loggedIn = loggedIn;
        });
    }

    public openLoginDialog(): void {
        let dialogRef = this.dialog.open(LoginComponent);
        dialogRef.afterClosed().subscribe();
    }
}
