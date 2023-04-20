import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EvaluationService {
    private BACKEND_URL: string = 'https://diedreiprojekt.pythonanywhere.com';

    constructor(private http: HttpClient) {}

    public getEvaluationTemplatesByBewerbungId(
        bewerbungId: number
    ): Observable<any> {
        return this.http.get(
            this.BACKEND_URL +
                '/employee/applications/evaluationtemplates/' +
                bewerbungId
        );
    }
}
