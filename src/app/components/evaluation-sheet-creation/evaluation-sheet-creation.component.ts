import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StudiengangService } from 'src/app/services/studiengang/studiengang.service';

@Component({
    selector: 'app-evaluation-sheet-creation',
    templateUrl: './evaluation-sheet-creation.component.html',
    styleUrls: ['./evaluation-sheet-creation.component.scss'],
})
export class EvaluationSheetCreationComponent implements OnInit {
    public loggedIn!: boolean;
    public criterias!: string[];
    public evaluationSheetNameForm!: FormControl;
    public criteriaForm!: FormControl;
    public studiengaenge!: any[];
    public displayedColumns!: string[];

    constructor(
        private studiengangService: StudiengangService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.authService.$loggedIn.subscribe(loggedIn => {
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
                this.criterias.push('Test1');
                this.criterias.push('Test2');
                this.evaluationSheetNameForm = new FormControl();
                this.criteriaForm = new FormControl();
            }
        });
    }

    public addCriteria(): void {
        this.criterias.push(this.criteriaForm.value);
    }

    private getAllStudiengaenge(): void {
        this.studiengangService
            .getAllStudiengaengeEmployee()
            .subscribe((studiengaenge: any) => {
                studiengaenge.map(
                    (studiengang: { isSelected: boolean }) =>
                        (studiengang.isSelected = false)
                );
                this.studiengaenge = studiengaenge;
            });
    }

    public createEvaluationSheet(): void {
        console.log(this.studiengaenge);
    }
}
