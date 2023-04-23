import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BewerbungService } from 'src/app/services/bewerbung/bewerbung.service';
import { StudiengangService } from 'src/app/services/studiengang/studiengang.service';
import { BewerbungLinkComponent } from '../bewerbung-link/bewerbung-link.component';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-bewerbung-detail',
    templateUrl: './bewerbung-detail.component.html',
    styleUrls: ['./bewerbung-detail.component.scss'],
})
export class BewerbungDetailComponent implements OnInit, OnDestroy {
    public studiengang!: any;
    public formGroup!: FormGroup;
    private uploadedFiles!: File[];
    public uploadedFileNames!: string;
    public buttonActivated: boolean = false;
    private bewerbungId!: number;
    private paramsSubscription!: Subscription;

    constructor(
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private studiengangService: StudiengangService,
        private bewerbungService: BewerbungService,
        private notificationService: NotificationService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.paramsSubscription = this.route.params.subscribe(params => {
            this.getStudiengangAndInitializeFormGroup(params['id']);
        });
    }

    ngOnDestroy(): void {
        this.paramsSubscription.unsubscribe();
    }

    private getStudiengangAndInitializeFormGroup(studiengangId: number): void {
        this.studiengangService
            .getStudiengangByIdVisitor(studiengangId)
            .subscribe((reponse: any) => {
                this.studiengang = reponse.data;
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
        const bewerbung = this.formGroup.value;
        bewerbung.courseId = this.studiengang.id;
        this.createBewerbung(bewerbung);
    }

    private createBewerbung(bewerbung: any) {
        this.bewerbungService.createBewerbung().subscribe((response: any) => {
            if (response.data.applicationId) {
                this.bewerbungId = response.data.applicationId;
                this.addInformationToBewerbung(bewerbung);
            }
        });
    }

    private addInformationToBewerbung(bewerbung: any) {
        this.bewerbungService
            .addInformationToBewerbung(this.bewerbungId, bewerbung)
            .subscribe(
                () => {
                    this.addFilesToBewerbung();
                },
                (error: any) => {
                    this.notificationService.displayNotification(error.msg);
                }
            );
    }

    private addFilesToBewerbung() {
        if (this.uploadedFiles) {
            this.uploadedFiles.map(
                file => {
                    const formDataFile = new FormData();
                    formDataFile.append('file', file, file.name);
                    if (
                        file ==
                        this.uploadedFiles[this.uploadedFiles.length - 1]
                    ) {
                        this.bewerbungService
                            .addFileToBewerbung(this.bewerbungId, formDataFile)
                            .subscribe(
                                () => {
                                    this.sendBewerbungEnd();
                                },
                                (error: any) => {
                                    this.notificationService.displayNotification(
                                        error.msg
                                    );
                                }
                            );
                    } else {
                        this.bewerbungService
                            .addFileToBewerbung(this.bewerbungId, formDataFile)
                            .subscribe(
                                () => {},
                                (error: any) => {
                                    this.notificationService.displayNotification(
                                        error.msg
                                    );
                                }
                            );
                    }
                },
                (error: any) => {
                    this.notificationService.displayNotification(error.msg);
                }
            );
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
    }

    private sendBewerbungEnd() {
        this.bewerbungService.sendBewerbung(this.bewerbungId).subscribe(() => {
            this.buttonActivated = false;
            this.openLinkDialog();
        });
    }

    private openLinkDialog(): void {
        let dialogRef = this.dialog.open(BewerbungLinkComponent);
        let instance = dialogRef.componentInstance;
        instance.bewerbungId = this.bewerbungId;
        dialogRef.afterClosed().subscribe();
    }
}
