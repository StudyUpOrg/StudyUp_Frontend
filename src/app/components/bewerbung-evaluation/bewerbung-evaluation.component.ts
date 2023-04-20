import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BewerbungService } from 'src/app/services/bewerbung/bewerbung.service';
import { DownloadFileService } from 'src/app/services/download-file/download-file.service';
import { EvaluationService } from 'src/app/services/evaluation/evaluation.service';

@Component({
    selector: 'app-bewerbung-evaluation',
    templateUrl: './bewerbung-evaluation.component.html',
    styleUrls: ['./bewerbung-evaluation.component.scss'],
    providers: [DatePipe],
})
export class BewerbungEvaluationComponent implements OnInit {
    public loggedIn!: boolean;
    public bewerbung!: any;
    public formGroup!: FormGroup;
    public evaluationSheets!: any[];
    public selectedEvaluationTemplate!: any;
    public displayedColumns!: string[];
    public statusList!: string[];

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private bewerbungService: BewerbungService,
        private formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private downloadFileService: DownloadFileService,
        private evaluationService: EvaluationService
    ) {}

    ngOnInit(): void {
        this.evaluationSheets = [
            {
                name: 'Englischkenntnisse',
                id: 1,
                criterias: [
                    {
                        name: 'Leseverstehen',
                        rating: 3,
                    },
                    {
                        name: 'Hörverstehen',
                        rating: 4,
                    },
                ],
                criteriaFeedback: 'Der Mann kann Englisch. Top!',
            },
            {
                name: 'IT-Kenntnisse',
                id: 2,
                criterias: [
                    {
                        name: 'Python',
                        rating: 5,
                    },
                    {
                        name: 'Java',
                        rating: 3,
                    },
                ],
                criteriaFeedback: 'Tiefgreifende Kenntnisse in Python!',
            },
        ];
        this.statusList = [
            'Angenommen',
            'Abgelehnt',
            'In Bearbeitung',
            'Eingereicht',
        ];
        this.displayedColumns = ['criteria', 'rating'];
        this.authService.$loggedIn.subscribe(loggedIn => {
            this.loggedIn = loggedIn;
            if (this.loggedIn) {
                this.route.params.subscribe(params => {
                    this.getBewerbung(params['id']);
                    this.getEvaluationTemplates(params['id']);
                });
            }
        });
    }

    private getBewerbung(bewerbungId: number): void {
        this.bewerbungService
            .getBewerbungInformationById(bewerbungId)
            .subscribe(bewerbung => {
                this.bewerbung = bewerbung[0];
                this.bewerbung.applicationreciptdate = this.datePipe.transform(
                    this.bewerbung.applicationreciptdate,
                    'dd.MM.yyyy'
                );
                this.bewerbungService
                    .getBewerbungFileInformationById(bewerbungId)
                    .subscribe(files => {
                        this.bewerbung.files = files;
                        this.formGroup = this.formBuilder.group({
                            applicantFirstName: [this.bewerbung.applicantname],
                            applicantLastName: [this.bewerbung.applicantname],
                            applicantMail: [this.bewerbung.applicantmail],
                            applicantTelNo: [this.bewerbung.applicantelno],
                            applicantLetter: [this.bewerbung.applicantletter],
                            applicationReciptDate: [
                                this.bewerbung.applicationreciptdate,
                            ],
                            courseName: [this.bewerbung.coursename],
                        });
                        this.formGroup.disable();
                    });
            });
    }

    private getEvaluationTemplates(bewerbungId: number): void {
        this.evaluationService
            .getEvaluationTemplatesByBewerbungId(bewerbungId)
            .subscribe();
    }

    public downloadBewerbungFile(file: any): void {
        this.bewerbungService.getBewerbungFileById(file.id).subscribe(blob => {
            this.downloadFileService.downloadFile(blob, file.originalName);
        });
    }

    public saveEvaluation(): void {
        console.log('test');
    }
}
