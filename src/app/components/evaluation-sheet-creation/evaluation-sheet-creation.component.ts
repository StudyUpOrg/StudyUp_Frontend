import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EvaluationService } from 'src/app/services/evaluation/evaluation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { StudiengangService } from 'src/app/services/studiengang/studiengang.service';

@Component({
    selector: 'app-evaluation-sheet-creation',
    templateUrl: './evaluation-sheet-creation.component.html',
    styleUrls: ['./evaluation-sheet-creation.component.scss'],
})
export class EvaluationSheetCreationComponent implements OnInit, OnDestroy {
    public loggedIn!: boolean;
    public criterias!: string[];
    public evaluationTemplateNameForm!: FormControl;
    public criteriaForm!: FormControl;
    public studiengaenge!: any[];
    public displayedColumns!: string[];
    private loggedInSubscription!: Subscription;

    constructor(
        private studiengangService: StudiengangService,
        private evaluationService: EvaluationService,
        private notificationService: NotificationService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.loggedInSubscription = this.authService.$loggedIn.subscribe(
            loggedIn => {
                this.loggedIn = loggedIn;
                if (this.loggedIn) {
                    this.getAllStudiengaenge();
                    this.displayedColumns = [
                        'title',
                        'degree',
                        'startDate',
                        'active',
                        'checkbox',
                    ];
                    this.criterias = new Array();
                    this.evaluationTemplateNameForm = new FormControl();
                    this.criteriaForm = new FormControl();
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.loggedInSubscription.unsubscribe();
    }

    public addCriteria(): void {
        this.criterias.push(this.criteriaForm.value);
        this.criteriaForm.patchValue('');
        this.criteriaForm.setErrors(null);
    }

    private getAllStudiengaenge(): void {
        this.studiengangService
            .getAllStudiengaengeEmployee()
            .subscribe((response: any) => {
                const studiengaenge = response.data;
                studiengaenge.map(
                    (studiengang: { isSelected: boolean }) =>
                        (studiengang.isSelected = false)
                );
                this.studiengaenge = studiengaenge;
            });
    }

    public createEvaluationSheet(): void {
        const evaluationTemplate = {
            templateName: this.evaluationTemplateNameForm.value,
            criterias: this.criterias,
            courses: this.studiengaenge
                .filter(studiengang => studiengang.isSelected)
                .map(studiengang => studiengang.id),
        };
        this.evaluationService
            .createEvaluationTemplate(evaluationTemplate)
            .subscribe(
                (response: any) => {
                    this.notificationService.displayNotification(response.msg);
                },
                (error: any) =>
                    this.notificationService.displayNotification(error.msg)
            );
    }
}
