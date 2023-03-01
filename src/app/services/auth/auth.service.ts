import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BACKEND_URL: string = 'https://diedreiprojekt.pythonanywhere.com';
  private loggedIn: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  public $loggedIn: Observable<boolean> = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.loggedIn.next(localStorage.getItem('authToken') != null);
  }

  public login(username: string, password: string): void {
    this.http
      .post<any>(this.BACKEND_URL + '/employee/login', {
        username: username,
        password: password,
      })
      .subscribe(
        (response) => {
          if (response.loggedIn == true) {
            localStorage.setItem('authToken', response.token);
            this.loggedIn.next(true);
            this.snackBar.open(
              'Du wurdest erfolgreich eingeloggt.',
              undefined,
              {
                duration: 5000,
              }
            );
          } else {
            this.snackBar.open(
              'Deine Eingaben waren nicht korrekt.',
              undefined,
              {
                duration: 5000,
              }
            );
          }
        },
        (error) => {
          this.snackBar.open(
            'Der Loginvorgang war nicht erfolgreich.',
            undefined,
            {
              duration: 5000,
            }
          );
        }
      );
  }

  public logout(): void {
    this.http.post<any>(this.BACKEND_URL + '/employee/logout', {}, {
      headers: new HttpHeaders({
        'token': localStorage.getItem('authToken') || '',
      })
    }).subscribe(
      (response) => {
        if (response.loggedOut == true) {
          localStorage.removeItem('authToken');
          this.loggedIn.next(false);
          this.snackBar.open('Du wurdest erfolgreich ausgeloggt.', undefined, {
            duration: 5000,
          });
        } else {
          this.snackBar.open(
            'Der Logoutvorgang war nicht erfolgreich.',
            undefined,
            {
              duration: 5000,
            }
          );
        }
      },
      (error) => {
        this.snackBar.open(
          'Der Logoutvorgang war nicht erfolgreich.',
          undefined,
          {
            duration: 5000,
          }
        );
      }
    );
  }
}
