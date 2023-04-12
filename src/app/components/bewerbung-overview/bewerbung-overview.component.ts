import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-bewerbung-overview',
    templateUrl: './bewerbung-overview.component.html',
    styleUrls: ['./bewerbung-overview.component.scss'],
})
export class BewerbungOverviewComponent implements OnInit {
    public studiengangForm!: FormControl;
    public statusForm!: FormControl;
    public bewerbungen: any;
    public displayedColumns!: string[];
    public studiengangNames!: string[];
    public statusNames!: string[];

    constructor() {}

    ngOnInit(): void {
        this.bewerbungen = [
            {
                courseName: 'Schach',
                startDate: new Date(),
                firstName: 'Magnus',
                lastName: 'Carlsen',
                id: 777,
            },
        ];
        this.displayedColumns = [
            'courseName',
            'startDate',
            'firstName',
            'lastName',
            'link',
        ];
        this.studiengangNames = [
            'Marketing',
            'Angewandte Informatik',
            'Wirtschaftsinformatik',
        ];
        this.statusNames = ['Status 1', 'Status 2', 'Status 3'];
        this.studiengangForm = new FormControl();
        this.statusForm = new FormControl();
    }
}
