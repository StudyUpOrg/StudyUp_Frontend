import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../notification/notification.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );
    public $loggedIn: Observable<boolean> = this.loggedIn.asObservable();

    constructor(
        private http: HttpClient,
        private notificationService: NotificationService
    ) {}

    public login(username: string, password: string): void {
        this.http
            .post<any>(environment.BACKEND_URL + '/employee/login', {
                username: username,
                password: password,
            })
            .subscribe(
                response => {
                    localStorage.setItem('authToken', response.data.token);
                    localStorage.setItem('username', username);
                    this.loggedIn.next(true);
                    this.notificationService.displayNotification(response.msg);
                },
                error => {
                    this.notificationService.displayNotification(
                        error.error.msg
                    );
                }
            );
    }

    public logout(): void {
        this.http
            .post<any>(
                environment.BACKEND_URL + '/employee/logout',
                {},
                {
                    headers: new HttpHeaders({
                        token: localStorage.getItem('authToken') || '',
                    }),
                }
            )
            .subscribe(
                response => {
                    localStorage.removeItem('authToken');
                    this.loggedIn.next(false);
                    this.notificationService.displayNotification(response.msg);
                },
                error => {
                    this.notificationService.displayNotification(
                        error.error.msg
                    );
                }
            );
    }
}
