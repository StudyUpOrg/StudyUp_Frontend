import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class StudiengangService {
  private BACKEND_URL: string = 'https://diedreiprojekt.pythonanywhere.com';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

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
            this.snackBar.open(
              'Der Studiengang wurde erfolgreich aktualisiert.',
              undefined,
              {
                duration: 5000,
              }
            );
          } else {
            this.snackBar.open(
              'Bei der Aktualisierung des Studiengangs ist ein Fehler aufgetreten.',
              undefined,
              {
                duration: 5000,
              }
            );
          }
        },
        (error) => {
          this.snackBar.open(
            'Bei der Aktualisierung des Studiengangs ist ein Fehler aufgetreten.',
            undefined,
            {
              duration: 5000,
            }
          );
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
            this.snackBar.open(
              'Der Studiengang wurde erfolgreich hinzugefügt',
              undefined,
              {
                duration: 5000,
              }
            );
          } else {
            this.snackBar.open(
              'Beim Hinzufügen des Studiengangs ist ein Fehler aufgetreten.',
              undefined,
              {
                duration: 5000,
              }
            );
          }
        },
        (error) => {
          this.snackBar.open(
            'Beim Hinzufügen des Studiengangs ist ein Fehler aufgetreten.',
            undefined,
            {
              duration: 5000,
            }
          );
        }
      );
  }
}
