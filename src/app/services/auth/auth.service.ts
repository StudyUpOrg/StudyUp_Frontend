import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BACKEND_URL: string = 'http://diedreiprojekt.pythonanywhere.com';
  private loggedIn: Subject<boolean> = new Subject<boolean>();
  public $loggedIn: Observable<boolean> = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  public login(username: string, password: string): void {
    this.http
      .post<any>(
        this.BACKEND_URL +
          '/employee/login?username=' +
          username +
          '&password=' +
          password,
        {}
      )
      .subscribe((response) => {
        if (response.loggedIn == true) {
          localStorage.setItem('authToken', response.token);
          this.loggedIn.next(true);
        }
      });
  }

  public logout(): void {
    this.http
      .post<any>(
        this.BACKEND_URL +
          '/employee/logout?token=' +
          localStorage.getItem('authToken'),
        {}
      )
      .subscribe(response => {
        if(response.loged_out == true)
        {
          localStorage.removeItem('authToken');
          this.loggedIn.next(false);
        }
      });
  }
}
