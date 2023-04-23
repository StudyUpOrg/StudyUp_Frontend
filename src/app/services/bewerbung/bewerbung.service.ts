import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class BewerbungService {
    constructor(private http: HttpClient) {}

    public createBewerbung() {
        return this.http.post<number>(
            environment.BACKEND_URL + '/visitor/apply',
            {}
        );
    }

    public addInformationToBewerbung(bewerbungId: number, bewerbung: any) {
        return this.http.put<any>(
            environment.BACKEND_URL +
                '/visitor/application/managemant/' +
                bewerbungId,
            bewerbung
        );
    }

    public addFileToBewerbung(bewerbungId: number, file: FormData) {
        return this.http.post<any>(
            environment.BACKEND_URL +
                '/visitor/application/documents/' +
                bewerbungId,
            file
        );
    }

    public sendBewerbung(bewerbungId: number) {
        return this.http.put<any>(
            environment.BACKEND_URL +
                '/visitor/application/send/' +
                bewerbungId,
            {}
        );
    }

    public getAllBewerbungen() {
        return this.http.get<any>(
            environment.BACKEND_URL + '/employee/applications',
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }

    public getBewerbungInformationById(bewerbungId: number) {
        return this.http.get<any>(
            environment.BACKEND_URL +
                '/employee/applications/' +
                bewerbungId +
                '/information',
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }

    public getBewerbungStatusById(bewerbungId: number) {
        return this.http.get<any>(
            environment.BACKEND_URL +
                '/visitor/application/managemant/' +
                bewerbungId
        );
    }

    public getBewerbungFileInformationById(bewerbungId: number) {
        return this.http.get<any>(
            environment.BACKEND_URL +
                '/employee/applications/' +
                bewerbungId +
                '/files',
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }

    public getBewerbungFileById(fileId: number) {
        return this.http.get(
            environment.BACKEND_URL +
                '/employee/files/applicationfile/' +
                fileId,
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
                responseType: 'blob',
            }
        );
    }

    public updateStatusOfBewerbungById(bewerbungId: number, statusId: number) {
        return this.http.put(
            environment.BACKEND_URL +
                '/employee/applications/' +
                bewerbungId +
                '/information',
            {
                status: statusId,
            },
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }
}
