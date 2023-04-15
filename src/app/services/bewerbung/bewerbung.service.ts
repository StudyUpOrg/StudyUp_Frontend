import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
    providedIn: 'root',
})
export class BewerbungService {
    private BACKEND_URL: string = 'https://diedreiprojekt.pythonanywhere.com';

    constructor(private http: HttpClient) {}

    public createBewerbung(): Observable<any> {
        return this.http.post<number>(this.BACKEND_URL + '/visitor/apply', {});
    }

    public addInformationToBewerbung(
        bewerbungId: number,
        bewerbung: any
    ): Observable<any> {
        return this.http.put<any>(
            this.BACKEND_URL + '/visitor/application/managemant/' + bewerbungId,
            bewerbung
        );
    }

    public addFileToBewerbung(
        bewerbungId: number,
        file: FormData
    ): Observable<any> {
        return this.http.post<any>(
            this.BACKEND_URL + '/visitor/application/documents/' + bewerbungId,
            file
        );
    }

    public sendBewerbung(bewerbungId: number): Observable<any> {
        return this.http.put<any>(
            this.BACKEND_URL + '/visitor/application/send/' + bewerbungId,
            {}
        );
    }

    public getAllBewerbungen(): Observable<any> {
        return this.http.get<any>(this.BACKEND_URL + '/employee/applications', {
            headers: new HttpHeaders({
                token: localStorage.getItem('authToken') || '',
            }),
        });
    }

    public getBewerbungInformationById(bewerbungId: number): Observable<any> {
        return this.http.get<any>(
            this.BACKEND_URL +
                '/employee/applications/information/' +
                bewerbungId,
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }

    public getBewerbungFileInformationById(
        bewerbungId: number
    ): Observable<any> {
        return this.http.get<any>(
            this.BACKEND_URL +
                '/employee/applications/files/information/' +
                bewerbungId,
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }
}
