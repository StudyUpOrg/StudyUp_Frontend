import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class StudiengangService {
  private BACKEND_URL: string = 'https://diedreiprojekt.pythonanywhere.com';

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

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

  public getStudiengangByIdVisitor(studiengangId: number) {
    return this.http.get(
      this.BACKEND_URL + '/visitor/courses/' + studiengangId
    );
  }

  public getStudiengangByIdEmployee(studiengangId: number) {
    return this.http.get(
      this.BACKEND_URL + '/employee/courses/' + studiengangId,
      {
        headers: new HttpHeaders({
          token: localStorage.getItem('authToken') || '',
        }),
      }
    );
  }

  public updateStudiengang(studiengang: any): void {
    this.http
      .put<any>(
        this.BACKEND_URL + '/employee/courses/' + studiengang.course_id,
        {
          name: studiengang.course_name,
          degreeId: 1,
          startDate: studiengang.course_start_date,
          description: studiengang.course_description,
          activated: studiengang.course_activated,
        },
        {
          headers: new HttpHeaders({
            token: localStorage.getItem('authToken') || '',
          }),
        }
      )
      .subscribe(
        (response) => {
          if (response.courseUpdated == true) {
            this.notificationService.displayNotification('Der Studiengang wurde erfolgreich aktualisiert.');
          } else {
            this.notificationService.displayNotification('Bei der Aktualisierung des Studiengangs ist ein Fehler aufgetreten.');
          }
        },
        (error) => {
          this.notificationService.displayNotification('Bei der Aktualisierung des Studiengangs ist ein Fehler aufgetreten.');
        }
      );
  }

  public createStudiengang(studiengang: any): void {
    this.http
      .post<any>(
        this.BACKEND_URL + '/employee/courses',
        {
          name: studiengang.course_name,
          degreeId: 1,
          startDate: studiengang.course_start_date,
          description: studiengang.course_description,
          activated: studiengang.course_activated,
        },
        {
          headers: new HttpHeaders({
            token: localStorage.getItem('authToken') || '',
          }),
        }
      )
      .subscribe(
        (response) => {
          if (response.newCourseInserted == true) {
            this.notificationService.displayNotification('Der Studiengang wurde erfolgreich hinzugefügt');
          } else {
            this.notificationService.displayNotification('Beim Hinzufügen des Studiengangs ist ein Fehler aufgetreten.');
          }
        },
        (error) => {
          this.notificationService.displayNotification('Beim Hinzufügen des Studiengangs ist ein Fehler aufgetreten.');
        }
      );
  }
}
