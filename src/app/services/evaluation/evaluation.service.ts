import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EvaluationService {
    constructor(private http: HttpClient) {}

    public createEvaluationTemplate(evaluationTemplate: any) {
        return this.http.post(
            environment.BACKEND_URL + '/employee/evaluationtemplates',
            evaluationTemplate,
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }

    public getAllEvaluationTemplates() {
        return this.http.get(
            environment.BACKEND_URL + '/employee/evaluationtemplates',
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }

    public getEvaluationSheetsByBewerbungId(bewerbungId: number) {
        return this.http.get(
            environment.BACKEND_URL +
                '/employee/applications/' +
                bewerbungId +
                '/evaluationtsheets',
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }

    public getUnusedEvaluationTemplatesByBewerbungId(bewerbungId: number) {
        return this.http.get(
            environment.BACKEND_URL +
                '/employee/applications/' +
                bewerbungId +
                '/unusedtemplates',
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }

    public getEvaluationTemplatesByStudiengangId(studiengangId: number) {
        return this.http.get(
            environment.BACKEND_URL +
                '/employee/courses/' +
                studiengangId +
                '/templates',
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }

    public getEvaluationTemplateDetailsByTemplateId(templateId: number) {
        return this.http.get(
            environment.BACKEND_URL +
                '/employee/evaluationtemplates/' +
                templateId,

            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }

    public getEvaluationSheetDetailsByTemplateId(templateId: number) {
        return this.http.get(
            environment.BACKEND_URL +
                '/employee/evaluationtsheets/template/' +
                templateId,

            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }

    public createEvaluation(bewerbungId: number, evaluationSheet: any) {
        return this.http.post(
            environment.BACKEND_URL +
                '/employee/applications/' +
                bewerbungId +
                '/filltemplate/' +
                evaluationSheet.templateId,
            evaluationSheet.sheetTemplate,
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }

    public addEvaluationTemplatesToStudiengangById(
        studiengangId: number,
        templateIds: number[]
    ) {
        return this.http.post(
            environment.BACKEND_URL +
                '/employee/courses/' +
                studiengangId +
                '/templates',
            {
                templates: templateIds,
            },
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }
}
