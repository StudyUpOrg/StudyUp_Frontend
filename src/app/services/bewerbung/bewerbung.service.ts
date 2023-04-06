import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
    providedIn: 'root',
})
export class BewerbungService {
    private BACKEND_URL: string = 'https://diedreiprojekt.pythonanywhere.com';

    constructor(private http: HttpClient, private notificationService: NotificationService) {}

    public createBewerbung(): Observable<any> {
        return this.http.post<number>(this.BACKEND_URL + '/visitor/apply', {});
    }

    public addInformationToBewerbung(bewerbungId: number, bewerbung: any): Observable<any> {
        return this.http.put<any>(this.BACKEND_URL + '/visitor/application/managemant/' + bewerbungId, bewerbung);
    }

    public addFileToBewerbung(bewerbungId: number, file: FormData): Observable<any> {
        return this.http.post<any>(this.BACKEND_URL + '/visitor/application/documents/' + bewerbungId, file);
    }

    public sendBewerbung(bewerbungId: number): Observable<any> {
        return this.http.put<any>(this.BACKEND_URL + '/visitor/application/send/' + bewerbungId, {});
    }
}
