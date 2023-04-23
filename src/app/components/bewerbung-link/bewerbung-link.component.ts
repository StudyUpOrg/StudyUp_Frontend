import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-bewerbung-link',
    templateUrl: './bewerbung-link.component.html',
    styleUrls: ['./bewerbung-link.component.scss'],
})
export class BewerbungLinkComponent implements OnInit {
    @Input() public bewerbungId!: number;
    public bewerbungLink!: string;
    constructor() {}

    ngOnInit(): void {
        this.bewerbungLink =
            window.location.origin +
            '/bewerbung/' +
            this.bewerbungId +
            '/status';
    }
}
