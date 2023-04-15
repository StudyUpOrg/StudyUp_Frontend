import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BewerbungService } from 'src/app/services/bewerbung/bewerbung.service';

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

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private bewerbungService: BewerbungService,
        private formBuilder: FormBuilder,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.authService.$loggedIn.subscribe(loggedIn => {
            this.loggedIn = loggedIn;
            if (this.loggedIn) {
                this.route.params.subscribe(params => {
                    this.getBewerbung(params['id']);
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
                    .subscribe(response => {
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
}
