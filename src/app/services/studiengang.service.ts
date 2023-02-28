import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudiengangService {
  private BACKEND_URL: string = 'http://diedreiprojekt.pythonanywhere.com';

  constructor(private http: HttpClient) { }

  getAllStudiengaenge() {
    return this.http.get(this.BACKEND_URL + '/visitor/courses');
  }
}
