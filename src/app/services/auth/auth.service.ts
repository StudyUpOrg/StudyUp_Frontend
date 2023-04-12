import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, ReplaySubject } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private BACKEND_URL: string = 'https://diedreiprojekt.pythonanywhere.com';
    private loggedIn: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    public $loggedIn: Observable<boolean> = this.loggedIn.asObservable();

    constructor(
        private http: HttpClient,
        private notificationService: NotificationService
    ) {
        this.loggedIn.next(false);
    }

    public login(username: string, password: string): void {
        this.http
            .post<any>(this.BACKEND_URL + '/employee/login', {
                username: username,
                password: password,
            })
            .subscribe(
                response => {
                    if (response.loggedIn == true) {
                        localStorage.setItem('authToken', response.token);
                        this.loggedIn.next(true);
                        this.notificationService.displayNotification(
                            'Du wurdest erfolgreich eingeloggt.'
                        );
                    } else {
                        this.notificationService.displayNotification(
                            'Deine Eingaben waren nicht korrekt.'
                        );
                    }
                },
                error => {
                    this.notificationService.displayNotification(
                        'Der Loginvorgang war nicht erfolgreich.'
                    );
                }
            );
    }

    public logout(): void {
        this.http
            .post<any>(
                this.BACKEND_URL + '/employee/logout',
                {},
                {
                    headers: new HttpHeaders({
                        token: localStorage.getItem('authToken') || '',
                    }),
                }
            )
            .subscribe(
                response => {
                    if (response.loggedOut == true) {
                        localStorage.removeItem('authToken');
                        this.loggedIn.next(false);
                        this.notificationService.displayNotification(
                            'Du wurdest erfolgreich ausgeloggt.'
                        );
                    } else {
                        this.notificationService.displayNotification(
                            'Der Logoutvorgang war nicht erfolgreich.'
                        );
                    }
                },
                error => {
                    this.notificationService.displayNotification(
                        'Der Logoutvorgang war nicht erfolgreich.'
                    );
                }
            );
    }
}
