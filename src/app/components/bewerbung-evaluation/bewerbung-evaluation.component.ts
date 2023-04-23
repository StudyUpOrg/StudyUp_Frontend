import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BewerbungService } from 'src/app/services/bewerbung/bewerbung.service';
import { DownloadFileService } from 'src/app/services/download-file/download-file.service';
import { EvaluationService } from 'src/app/services/evaluation/evaluation.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
    selector: 'app-bewerbung-evaluation',
    templateUrl: './bewerbung-evaluation.component.html',
    styleUrls: ['./bewerbung-evaluation.component.scss'],
    providers: [DatePipe],
})
export class BewerbungEvaluationComponent implements OnInit, OnDestroy {
    public loggedIn!: boolean;
    public bewerbung!: any;
    public formGroup!: FormGroup;
    public evaluationSheets!: any[];
    public evaluationTemplates!: any[];
    public selectedEvaluationTemplate!: any;
    public displayedColumns!: string[];
    public statusList!: string[];
    public evaluationTemplateIsFilled!: boolean;
    public oldStatus!: string;
    private loggedInSubscription!: Subscription;
    private paramsSubscription!: Subscription;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private bewerbungService: BewerbungService,
        private downloadFileService: DownloadFileService,
        private evaluationService: EvaluationService,
        private notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.evaluationTemplateIsFilled = false;
        this.statusList = [
            'Eingereicht',
            'In Bearbeitung',
            'Abgelehnt',
            'Zum Auswahlverfahren eingeladen',
            'Angenommen',
        ];
        this.displayedColumns = ['criteria', 'rating'];
        this.loggedInSubscription = this.authService.$loggedIn.subscribe(
            loggedIn => {
                this.loggedIn = loggedIn;
                if (this.loggedIn) {
                    this.paramsSubscription = this.route.params.subscribe(
                        params => {
                            this.getBewerbung(params['id']);
                            this.getEvaluationSheets(params['id']);
                            this.getEvaluationTemplates(params['id']);
                        }
                    );
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.loggedInSubscription.unsubscribe();
        this.paramsSubscription.unsubscribe();
    }

    private getBewerbung(bewerbungId: number): void {
        this.bewerbungService
            .getBewerbungInformationById(bewerbungId)
            .subscribe(
                response => {
                    this.bewerbung = response.data;
                    this.oldStatus = this.bewerbung.applicationStatusName;
                    this.bewerbung.applicationReciptDate =
                        this.datePipe.transform(
                            this.bewerbung.applicationReciptDate,
                            'dd.MM.yyyy'
                        );
                    this.bewerbungService
                        .getBewerbungFileInformationById(bewerbungId)
                        .subscribe(
                            response => {
                                this.bewerbung.files = response.data;
                                this.formGroup = this.formBuilder.group({
                                    applicantFirstName: [
                                        this.bewerbung.applicantFirstName,
                                    ],
                                    applicantLastName: [
                                        this.bewerbung.applicantLastName,
                                    ],
                                    applicantMail: [
                                        this.bewerbung.applicantMail,
                                    ],
                                    applicantTelNo: [
                                        this.bewerbung.applicantTelNo,
                                    ],
                                    applicantLetter: [
                                        this.bewerbung.applicantLetter,
                                    ],
                                    applicationReciptDate: [
                                        this.bewerbung.applicationReciptDate,
                                    ],
                                    courseName: [this.bewerbung.courseName],
                                });
                                this.formGroup.disable();
                            },
                            (error: any) => {
                                this.notificationService.displayNotification(
                                    error.msg
                                );
                            }
                        );
                },
                (error: any) => {
                    this.notificationService.displayNotification(
                        error.error.msg
                    );
                }
            );
    }

    public getEvaluationTemplateDetails(templateId: number) {
        this.evaluationService
            .getEvaluationSheetDetailsByTemplateId(templateId)
            .subscribe(
                (response: any) => {
                    this.selectedEvaluationTemplate = response.data;
                    this.selectedEvaluationTemplate.templateId = templateId;
                },
                (error: any) => {
                    this.notificationService.displayNotification(
                        error.error.msg
                    );
                }
            );
    }

    public checkIfEvaluationTemplateIsFilled() {
        let isFilled: boolean = true;
        this.selectedEvaluationTemplate.sheetTemplate.ratings.forEach(function (
            criteria: any
        ) {
            if (!criteria.rating) {
                isFilled = false;
            }
        });
        this.evaluationTemplateIsFilled = isFilled;
    }

    private getEvaluationTemplates(bewerbungId: number) {
        this.evaluationService
            .getUnusedEvaluationTemplatesByBewerbungId(bewerbungId)
            .subscribe(
                (response: any) => {
                    this.evaluationTemplates = response.data;
                },
                (error: any) => {
                    this.notificationService.displayNotification(
                        error.error.msg
                    );
                }
            );
    }

    private getEvaluationSheets(bewerbungId: number) {
        this.evaluationService
            .getEvaluationSheetsByBewerbungId(bewerbungId)
            .subscribe(
                (response: any) => {
                    this.evaluationSheets = response.data;
                },
                (error: any) => {
                    this.notificationService.displayNotification(
                        error.error.msg
                    );
                }
            );
    }

    public downloadBewerbungFile(file: any) {
        this.bewerbungService.getBewerbungFileById(file.id).subscribe(
            response => {
                this.downloadFileService.downloadFile(
                    response,
                    file.originalName
                );
            },
            (error: any) => {
                this.notificationService.displayNotification(error.error.msg);
            }
        );
    }

    public saveEvaluation() {
        this.evaluationService
            .createEvaluation(
                this.bewerbung.applicationId,
                this.selectedEvaluationTemplate
            )
            .subscribe(
                (response: any) => {
                    this.getEvaluationSheets(this.bewerbung.applicationId);
                    this.getEvaluationTemplates(this.bewerbung.applicationId);
                    this.selectedEvaluationTemplate = undefined;
                    this.notificationService.displayNotification(response.msg);
                },
                error => {
                    this.notificationService.displayNotification(
                        error.error.msg
                    );
                }
            );
    }

    public updateBewerbungStatus() {
        this.bewerbungService
            .updateStatusOfBewerbungById(
                this.bewerbung.applicationId,
                this.statusList.indexOf(this.bewerbung.applicationStatusName) +
                    1
            )
            .subscribe(
                (response: any) => {
                    this.notificationService.displayNotification(response.msg);
                    this.oldStatus = this.bewerbung.applicationStatusName;
                },
                error => {
                    this.notificationService.displayNotification(
                        error.error.msg
                    );
                }
            );
    }
}
