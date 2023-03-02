import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudiengangService {
  private BACKEND_URL: string = 'https://diedreiprojekt.pythonanywhere.com';

  constructor(private http: HttpClient) {}

  public getAllStudiengaengeVisitor() {
    return this.http.get(this.BACKEND_URL + '/visitor/courses');
  }

  public getAllStudiengaengeEmployee() {
    return this.http.get(this.BACKEND_URL + '/employee/courses', {
      headers: new HttpHeaders({
        token: localStorage.getItem('authToken') || '',
      }),
    });
  }
}
