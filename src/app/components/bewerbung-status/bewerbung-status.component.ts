import { Component } from '@angular/core';

@Component({
    selector: 'app-bewerbung-status',
    templateUrl: './bewerbung-status.component.html',
    styleUrls: ['./bewerbung-status.component.scss'],
})
export class BewerbungStatusComponent {
    public dataSource = [
        {
            title: 'Toller Studiengang',
            firstName: 'Patrick',
            lastName: 'Münster',
            status: 'in Bearbeitung',
        },
    ];
    public displayedColumns = ['title', 'firstName', 'lastName', 'status'];

    constructor() {}
}
