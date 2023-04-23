import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

import { LoginComponent } from '../login/login.component';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
    public loggedIn!: boolean;
    private loggedInSubscription!: Subscription;

    constructor(public dialog: MatDialog, private authService: AuthService) {}

    ngOnInit(): void {
        this.loggedInSubscription = this.authService.$loggedIn.subscribe(
            loggedIn => {
                this.loggedIn = loggedIn;
            }
        );
    }

    ngOnDestroy(): void {
        this.loggedInSubscription.unsubscribe();
    }

    public openLoginDialog(): void {
        let dialogRef = this.dialog.open(LoginComponent);
        dialogRef.afterClosed().subscribe();
    }
}
