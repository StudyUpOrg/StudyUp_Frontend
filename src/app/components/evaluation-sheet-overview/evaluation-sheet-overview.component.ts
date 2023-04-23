import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EvaluationService } from 'src/app/services/evaluation/evaluation.service';

@Component({
    selector: 'app-evaluation-sheet-overview',
    templateUrl: './evaluation-sheet-overview.component.html',
    styleUrls: ['./evaluation-sheet-overview.component.scss'],
})
export class EvaluationSheetOverviewComponent implements OnInit {
    public evaluationTemplates!: any[];
    public selectedEvaluationTemplate!: any;
    public loggedIn!: boolean;
    public loggedInSubscription!: Subscription;

    constructor(
        private authService: AuthService,
        private evaluationService: EvaluationService
    ) {}

    ngOnInit(): void {
        this.loggedInSubscription = this.authService.$loggedIn.subscribe(
            loggedIn => {
                this.loggedIn = loggedIn;
                if (this.loggedIn) {
                    this.evaluationService
                        .getAllEvaluationTemplates()
                        .subscribe((response: any) => {
                            this.evaluationTemplates = response.data;
                        });
                }
            }
        );
    }

    public getEvaluationTemplateDetails(templateId: number) {
        this.evaluationService
            .getEvaluationTemplateDetailsByTemplateId(templateId)
            .subscribe((response: any) => {
                this.selectedEvaluationTemplate = response.data;
            });
    }
}
