import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-evaluation-sheet-creation',
  templateUrl: './evaluation-sheet-creation.component.html',
  styleUrls: ['./evaluation-sheet-creation.component.scss'],
})
export class EvaluationSheetCreationComponent implements OnInit {
  public criterias!: string[];
  public studiengangNames!: string[];
  public studiengangForm!: FormControl;
  public evaluationSheetNameForm!: FormControl;
  public criteriaForm!: FormControl;

  constructor() {}

  ngOnInit(): void {
    this.studiengangNames = [
      'Marketing',
      'Angewandte Informatik',
      'Wirtschaftsinformatik',
    ];
    this.studiengangForm = new FormControl();
    this.evaluationSheetNameForm = new FormControl();
    this.criteriaForm = new FormControl();
  }
}
