import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StudiengangService } from 'src/app/services/studiengang/studiengang.service';

@Component({
  selector: 'app-studiengang-detail',
  templateUrl: './studiengang-detail.component.html',
  styleUrls: ['./studiengang-detail.component.scss'],
})
export class StudiengangDetailComponent implements OnInit {
  public loggedIn!: boolean;
  public studiengang!: any;
  public formGroup!: FormGroup;
  public hasStudiengangChangedValidly: boolean = false;
  public isNewStudiengang: boolean = false;

  constructor(
    private authService: AuthService,
    private studiengangService: StudiengangService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authService.$loggedIn.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
    this.route.params.subscribe((params) => {
      if (params['id'] == 'neu') {
        this.isNewStudiengang = true;
        this.initializeEmptyFormGroup();
      } else {
        this.getStudiengangByIdAndInitializeFormGroup(params['id']);
      }
    });
  }

  private initializeEmptyFormGroup(): void {
    if (this.loggedIn) {
      this.formGroup = this.formBuilder.group({
        title: ['', Validators.required],
        degree: ['', Validators.required],
        startDate: ['', Validators.required],
        description: ['', Validators.required],
        status: ['', Validators.required],
      });
      this.formGroup.valueChanges.subscribe(() => {
        this.hasStudiengangChangedValidly =
          this.formGroup.dirty && this.formGroup.valid;
      });
    }
  }

  private getStudiengangByIdAndInitializeFormGroup(
    studiengangId: number
  ): void {
    if (!this.loggedIn) {
      this.studiengangService
        .getStudiengangByIdVisitor(studiengangId)
        .subscribe((studiengang) => {
          this.studiengang = studiengang;
          this.formGroup = this.formBuilder.group({
            title: [this.studiengang.course_name, Validators.required],
            degree: [this.studiengang.degree_name, Validators.required],
            startDate: [
              this.studiengang.course_start_date,
              Validators.required,
            ],
            description: [
              this.studiengang.course_description,
              Validators.required,
            ],
          });
          this.formGroup.disable();
        });
    } else {
      this.studiengangService
        .getStudiengangByIdEmployee(studiengangId)
        .subscribe((studiengang) => {
          this.studiengang = studiengang;
          this.formGroup = this.formBuilder.group({
            title: [this.studiengang.course_name, Validators.required],
            degree: [this.studiengang.degree_name, Validators.required],
            startDate: [
              this.studiengang.course_start_date,
              Validators.required,
            ],
            description: [
              this.studiengang.course_description,
              Validators.required,
            ],
            status: [this.studiengang.course_activated, Validators.required],
          });
          this.formGroup.valueChanges.subscribe(() => {
            this.hasStudiengangChangedValidly =
              this.formGroup.dirty && this.formGroup.valid;
          });
        });
    }
  }

  public updateStudiengang(): void {
    const formValues = this.formGroup.value;
    this.studiengang = {
      course_id: this.studiengang.course_id,
      course_name: formValues.title,
      course_start_date: formValues.startDate,
      course_description: formValues.description,
      course_activated: formValues.status,
    };
    this.studiengangService.updateStudiengang(this.studiengang);
  }

  public createStudiengang(): void {
    const formValues = this.formGroup.value;
    this.studiengang = {
      course_name: formValues.title,
      course_start_date: formValues.startDate,
      course_description: formValues.description,
      course_activated: formValues.status,
    };
    this.studiengangService.createStudiengang(this.studiengang);
  }
}
