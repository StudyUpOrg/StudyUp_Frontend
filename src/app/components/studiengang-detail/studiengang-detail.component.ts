import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EvaluationService } from 'src/app/services/evaluation/evaluation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { StudiengangService } from 'src/app/services/studiengang/studiengang.service';

@Component({
    selector: 'app-studiengang-detail',
    templateUrl: './studiengang-detail.component.html',
    styleUrls: ['./studiengang-detail.component.scss'],
})
export class StudiengangDetailComponent implements OnInit, OnDestroy {
    public loggedIn!: boolean;
    public studiengang!: any;
    public formGroup!: FormGroup;
    public hasStudiengangChangedValidly: boolean = false;
    public isNewStudiengang: boolean = false;
    public evaluationTemplates!: any[];
    public selectedEvaluationTemplates!: any[];
    public oldSelectedEvaluationTemplates!: any[];
    private loggedInSubscription!: Subscription;
    private paramsSubscription!: Subscription;

    constructor(
        private authService: AuthService,
        private studiengangService: StudiengangService,
        private notificationService: NotificationService,
        private evaluationService: EvaluationService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.oldSelectedEvaluationTemplates = [];
        this.selectedEvaluationTemplates = [];
        this.loggedInSubscription = this.authService.$loggedIn.subscribe(
            loggedIn => {
                this.loggedIn = loggedIn;
                this.paramsSubscription = this.route.params.subscribe(
                    params => {
                        if (params['id'] == 'neu') {
                            if (this.loggedIn) {
                                this.isNewStudiengang = true;
                                this.initializeEmptyFormGroup();
                                this.getAllEvaluationTemplates();
                            }
                        } else {
                            this.getStudiengangByIdAndInitializeFormGroup(
                                params['id']
                            );

                            if (this.loggedIn) {
                                this.getAllEvaluationTemplates();
                                this.getEvaluationTemplatesByStudiengangId(
                                    params['id']
                                );
                            }
                        }
                    }
                );
            }
        );
    }

    ngOnDestroy(): void {
        this.loggedInSubscription.unsubscribe();
        this.paramsSubscription.unsubscribe();
    }

    private initializeEmptyFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            name: ['', Validators.required],
            degreeName: ['', Validators.required],
            startDate: ['', Validators.required],
            description: ['', Validators.required],
            activated: ['', Validators.required],
        });
        this.formGroup.valueChanges.subscribe(() => {
            this.hasStudiengangChangedValidly =
                this.formGroup.dirty && this.formGroup.valid;
        });
    }

    private getStudiengangByIdAndInitializeFormGroup(
        studiengangId: number
    ): void {
        if (!this.loggedIn) {
            this.studiengangService
                .getStudiengangByIdVisitor(studiengangId)
                .subscribe(
                    (reponse: any) => {
                        this.studiengang = reponse.data;
                        this.formGroup = this.formBuilder.group({
                            name: [this.studiengang.name, Validators.required],
                            degreeName: [
                                this.studiengang.degreeName,
                                Validators.required,
                            ],
                            startDate: [
                                this.studiengang.startDate,
                                Validators.required,
                            ],
                            description: [
                                this.studiengang.description,
                                Validators.required,
                            ],
                        });
                        this.formGroup.disable();
                    },
                    (error: any) => {
                        this.notificationService.displayNotification(
                            error.error.msg
                        );
                    }
                );
        } else {
            this.studiengangService
                .getStudiengangByIdEmployee(studiengangId)
                .subscribe(
                    (response: any) => {
                        this.studiengang = response.data;
                        this.formGroup = this.formBuilder.group({
                            name: [this.studiengang.name, Validators.required],
                            degreeName: [
                                this.studiengang.degreeName,
                                Validators.required,
                            ],
                            startDate: [
                                this.studiengang.startDate,
                                Validators.required,
                            ],
                            description: [
                                this.studiengang.description,
                                Validators.required,
                            ],
                            activated: [
                                this.studiengang.activated,
                                Validators.required,
                            ],
                        });
                        this.formGroup.valueChanges.subscribe(() => {
                            this.hasStudiengangChangedValidly =
                                this.formGroup.dirty && this.formGroup.valid;
                        });
                    },
                    (error: any) => {
                        this.notificationService.displayNotification(
                            error.error.msg
                        );
                    }
                );
        }
    }

    private getAllEvaluationTemplates() {
        this.evaluationService.getAllEvaluationTemplates().subscribe(
            (response: any) => {
                this.evaluationTemplates = response.data;
            },
            (error: any) => {
                this.notificationService.displayNotification(error.error.msg);
            }
        );
    }

    private getEvaluationTemplatesByStudiengangId(studiengangId: number) {
        this.evaluationService
            .getEvaluationTemplatesByStudiengangId(studiengangId)
            .subscribe(
                (response: any) => {
                    this.selectedEvaluationTemplates = response.data.map(
                        (template: any) => {
                            template.id = parseInt(
                                template.evaluationTemplateId
                            );
                            template.templateName =
                                template.evaluationTemplateName.toString();
                            delete template.evaluationTemplateId;
                            delete template.evaluationTemplateName;
                            return template;
                        }
                    );
                    this.oldSelectedEvaluationTemplates =
                        this.selectedEvaluationTemplates;
                },
                (error: any) => {
                    this.notificationService.displayNotification(
                        error.error.msg
                    );
                }
            );
    }

    private addEvaluationTemplates(studiengangId: number) {
        if (this.isNewStudiengang) {
            this.evaluationService
                .addEvaluationTemplatesToStudiengangById(
                    studiengangId,
                    this.selectedEvaluationTemplates.map(
                        template => template.id
                    )
                )
                .subscribe(
                    (response: any) => {
                        this.notificationService.displayNotification(
                            response.msg
                        );
                    },
                    (error: any) => {
                        this.notificationService.displayNotification(
                            error.error.msg
                        );
                    }
                );
        } else {
            this.evaluationService
                .addEvaluationTemplatesToStudiengangById(
                    studiengangId,
                    this.selectedEvaluationTemplates
                        .map(template => template.id)
                        .filter(
                            tId =>
                                !this.oldSelectedEvaluationTemplates.some(
                                    template => template.id == tId
                                )
                        )
                )
                .subscribe(
                    (response: any) => {
                        this.notificationService.displayNotification(
                            response.msg
                        );
                    },
                    (error: any) => {
                        this.notificationService.displayNotification(
                            error.error.msg
                        );
                    }
                );
        }
    }

    public compareEvaluationTemplates(template1: any, template2: any): boolean {
        return template1 && template2 && template1.id == template2.id;
    }

    public checkIfEvaluationTemplateWasAlreadySelected(template: any) {
        return this.oldSelectedEvaluationTemplates.some(
            t => t.id == template.id
        );
    }

    public updateStudiengang(): void {
        const studiengangId = this.studiengang.id;
        this.studiengang = this.formGroup.value;
        this.studiengang.id = studiengangId;
        this.studiengangService.updateStudiengang(this.studiengang).subscribe(
            (response: any) => {
                if (
                    this.selectedEvaluationTemplates.length >
                    this.oldSelectedEvaluationTemplates.length
                ) {
                    this.addEvaluationTemplates(this.studiengang.id);
                }
                this.notificationService.displayNotification(response.msg);
            },
            (error: any) => {
                this.notificationService.displayNotification(error.error.msg);
            }
        );
    }

    public createStudiengang(): void {
        this.studiengang = this.formGroup.value;
        this.studiengangService.createStudiengang(this.studiengang).subscribe(
            (response: any) => {
                if (
                    this.selectedEvaluationTemplates.length >
                    this.oldSelectedEvaluationTemplates.length
                ) {
                    this.addEvaluationTemplates(response.data.courseId);
                }
                this.notificationService.displayNotification(response.msg);
                this.formGroup.reset();
                this.selectedEvaluationTemplates = [];
            },
            (error: any) => {
                this.notificationService.displayNotification(error.error.msg);
            }
        );
    }
}
