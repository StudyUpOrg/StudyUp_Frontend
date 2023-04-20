import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-bewerbung-status',
    templateUrl: './bewerbung-status.component.html',
    styleUrls: ['./bewerbung-status.component.scss'],
})
export class BewerbungStatusComponent implements OnInit {
    public displayedColumns!: string[];
    public bewerbung!: any;

    constructor() {}

    ngOnInit(): void {
        this.displayedColumns = [
            'courseName',
            'receiptDate',
            'firstName',
            'lastName',
            'status',
        ];
        this.bewerbung = [
            {
                coursename: 'Toller Studiengang',
                applicationreceiptdate: new Date(),
                applicantfirstname: 'Magnus',
                applicantlastname: 'Carlsen',
                applicationstatus: 'In Bearbeitung',
            },
        ];
    }
}
