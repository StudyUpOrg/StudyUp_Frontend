import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class StudiengangService {
    constructor(private http: HttpClient) {}

    public getAllStudiengaengeVisitor() {
        return this.http.get(environment.BACKEND_URL + '/visitor/courses');
    }

    public getAllStudiengaengeEmployee() {
        return this.http.get(environment.BACKEND_URL + '/employee/courses', {
            headers: new HttpHeaders({
                token: localStorage.getItem('authToken') || '',
            }),
        });
    }

    public getStudiengangByIdVisitor(studiengangId: number) {
        return this.http.get(
            environment.BACKEND_URL + '/visitor/courses/' + studiengangId
        );
    }

    public getStudiengangByIdEmployee(studiengangId: number) {
        return this.http.get(
            environment.BACKEND_URL +
                '/employee/courses/' +
                studiengangId +
                '/course',
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }

    public updateStudiengang(studiengang: any) {
        return this.http.put<any>(
            environment.BACKEND_URL +
                '/employee/courses/' +
                studiengang.id +
                '/course',
            studiengang,
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }

    public createStudiengang(studiengang: any) {
        return this.http.post<any>(
            environment.BACKEND_URL + '/employee/courses',
            studiengang,
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }
}
