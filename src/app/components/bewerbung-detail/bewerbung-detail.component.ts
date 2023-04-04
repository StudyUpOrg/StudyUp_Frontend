import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BewerbungService } from 'src/app/services/bewerbung/bewerbung.service';
import { StudiengangService } from 'src/app/services/studiengang/studiengang.service';
import { map } from 'rxjs/operators';

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
  public hasBewerbungChangedValidly: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private studiengangService: StudiengangService,
    private bewerbungService: BewerbungService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authService.$loggedIn.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
    this.route.params.subscribe((params) => {
      this.getStudiengangAndInitializeFormGroup(params['id']);
    });
  }

  private getStudiengangAndInitializeFormGroup(studiengangId: number): void {
    this.studiengangService
      .getStudiengangByIdVisitor(studiengangId)
      .subscribe((studiengang) => {
        this.studiengang = studiengang;
        this.formGroup = this.formBuilder.group({
          applicantName: ['', Validators.required],
          applicantMail: ['', Validators.required],
          applicantTelNo: ['', Validators.required]
        });
        this.formGroup.valueChanges.subscribe(() => {
          this.hasBewerbungChangedValidly =
            this.formGroup.dirty && this.formGroup.valid;
        });
      });
    
  }

  public onFilesSelected(event: any): void {
    this.uploadedFiles = Array.from(event.target.files);
    this.uploadedFileNames = this.uploadedFiles
      .map((file) => file.name)
      .join(', ');
  }

  public sendBewerbung(): void {
    const formValues = this.formGroup.value;
    const bewerbung: any = {
      courseId: this.studiengang.course_id,
      applicantName: formValues.applicantName,
      applicantMail: formValues.applicantMail,
      applicantTelNo: formValues.applicantTelNo,
      applicantLetter: '',
    };
    const formDataFiles = new FormData();

    this.uploadedFiles.map((file) => {
      formDataFiles.append('file', file, file.name);
    });
    this.bewerbungService.sendBewerbung(bewerbung, formDataFiles);
  }
}
