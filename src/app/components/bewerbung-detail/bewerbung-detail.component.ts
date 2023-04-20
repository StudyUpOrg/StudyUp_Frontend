import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BewerbungService } from 'src/app/services/bewerbung/bewerbung.service';
import { StudiengangService } from 'src/app/services/studiengang/studiengang.service';
import { map } from 'rxjs/operators';
import { BewerbungLinkComponent } from '../bewerbung-link/bewerbung-link.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-bewerbung-detail',
    templateUrl: './bewerbung-detail.component.html',
    styleUrls: ['./bewerbung-detail.component.scss'],
})
export class BewerbungDetailComponent implements OnInit {
    public loggedIn!: boolean;
    public studiengang!: any;
    public formGroup!: FormGroup;
    private uploadedFiles!: File[];
    public uploadedFileNames!: string;
    public buttonActivated: boolean = false;
    private bewerbungId!: number;

    constructor(
        private dialog: MatDialog,
        private authService: AuthService,
        private route: ActivatedRoute,
        private studiengangService: StudiengangService,
        private bewerbungService: BewerbungService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.authService.$loggedIn.subscribe(loggedIn => {
            this.loggedIn = loggedIn;
            if (this.loggedIn) {
                this.route.params.subscribe(params => {
                    this.getStudiengangAndInitializeFormGroup(params['id']);
                });
            }
        });
    }

    private getStudiengangAndInitializeFormGroup(studiengangId: number): void {
        this.studiengangService
            .getStudiengangByIdVisitor(studiengangId)
            .subscribe(studiengang => {
                this.studiengang = studiengang;
                this.formGroup = this.formBuilder.group({
                    applicantFirstName: ['', Validators.required],
                    applicantLastName: ['', Validators.required],
                    applicantMail: ['', Validators.required],
                    applicantTelNo: ['', Validators.required],
                    applicantLetter: ['', Validators.required],
                });
                this.formGroup.valueChanges.subscribe(() => {
                    this.buttonActivated =
                        this.formGroup.dirty && this.formGroup.valid;
                });
            });
    }

    public onFilesSelected(event: any): void {
        this.uploadedFiles = Array.from(event.target.files);
        this.uploadedFileNames = this.uploadedFiles
            .map(file => file.name)
            .join(', ');
    }

    public sendBewerbung(): void {
        const formValues = this.formGroup.value;
        const bewerbung: any = {
            courseId: this.studiengang.course_id,
            applicantFirstName: formValues.applicantFirstName,
            applicantLastName: formValues.applicantLastName,
            applicantMail: formValues.applicantMail,
            applicantTelNo: formValues.applicantTelNo,
            applicantLetter: formValues.applicantLetter,
        };

        this.bewerbungService.createBewerbung().subscribe(response => {
            if (response.applicationId) {
                this.bewerbungId = response.applicationId;
                this.bewerbungService
                    .addInformationToBewerbung(this.bewerbungId, bewerbung)
                    .subscribe(() => {
                        if (this.uploadedFiles) {
                            this.uploadedFiles.map(file => {
                                const formDataFile = new FormData();
                                formDataFile.append('file', file, file.name);
                                if (
                                    file ==
                                    this.uploadedFiles[
                                        this.uploadedFiles.length - 1
                                    ]
                                ) {
                                    this.bewerbungService
                                        .addFileToBewerbung(
                                            this.bewerbungId,
                                            formDataFile
                                        )
                                        .subscribe(() => {
                                            this.bewerbungService
                                                .sendBewerbung(this.bewerbungId)
                                                .subscribe(() => {
                                                    this.buttonActivated =
                                                        false;
                                                    this.openLinkDialog();
                                                });
                                        });
                                } else {
                                    this.bewerbungService
                                        .addFileToBewerbung(
                                            this.bewerbungId,
                                            formDataFile
                                        )
                                        .subscribe();
                                }
                            });
                        } else {
                            this.bewerbungService
                                .sendBewerbung(this.bewerbungId)
                                .subscribe(() =>
                                    this.bewerbungService
                                        .sendBewerbung(this.bewerbungId)
                                        .subscribe(() => {
                                            this.buttonActivated = false;
                                            this.openLinkDialog();
                                        })
                                );
                        }
                    });
            }
        });
    }

    private openLinkDialog(): void {
        let dialogRef = this.dialog.open(BewerbungLinkComponent);
        let instance = dialogRef.componentInstance;
        instance.bewerbungId = this.bewerbungId;
        dialogRef.afterClosed().subscribe();
    }
}
