import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BewerbungService } from 'src/app/services/bewerbung/bewerbung.service';

@Component({
    selector: 'app-bewerbung-overview',
    templateUrl: './bewerbung-overview.component.html',
    styleUrls: ['./bewerbung-overview.component.scss'],
})
export class BewerbungOverviewComponent implements OnInit {
    public loggedIn!: boolean;
    public studiengangForm!: FormControl;
    public statusForm!: FormControl;
    public displayedBewerbungen!: any[];
    public displayedColumns!: string[];
    public studiengangNames!: Set<string>;
    public statusNames!: Set<string>;
    private bewerbungen!: any[];

    constructor(
        private authService: AuthService,
        private bewerbungService: BewerbungService
    ) {}

    ngOnInit(): void {
        this.displayedColumns = [
            'courseName',
            'startDate',
            'firstName',
            'lastName',
            'status',
            'link',
        ];
        this.authService.$loggedIn.subscribe(loggedIn => {
            this.loggedIn = loggedIn;
            if (loggedIn) {
                this.bewerbungService
                    .getAllBewerbungen()
                    .subscribe(bewerbungen => {
                        this.bewerbungen = bewerbungen;
                        this.displayedBewerbungen = bewerbungen;
                        this.studiengangNames = new Set(
                            this.bewerbungen.map(
                                bewerbung => bewerbung.coursename
                            )
                        );
                        this.statusNames = new Set(
                            this.bewerbungen.map(
                                bewerbung => bewerbung.applicationstatus
                            )
                        );
                        this.studiengangForm = new FormControl();
                        this.statusForm = new FormControl();
                    });
            }
        });
    }

    public updateBewerbungFilter(): void {
        let selectedStudiengang = this.studiengangForm.value;
        let selectedStatus = this.statusForm.value;
        if (
            selectedStudiengang &&
            selectedStudiengang.length > 0 &&
            selectedStatus &&
            selectedStatus.length > 0
        ) {
            this.displayedBewerbungen = this.bewerbungen.filter(
                bewerbung =>
                    selectedStudiengang.includes(bewerbung.coursename) &&
                    selectedStatus.includes(bewerbung.applicationstatus)
            );
        } else if (
            selectedStudiengang &&
            selectedStudiengang.length > 0 &&
            (!selectedStatus || selectedStatus.length == 0)
        ) {
            this.displayedBewerbungen = this.bewerbungen.filter(bewerbung =>
                selectedStudiengang.includes(bewerbung.coursename)
            );
        } else if (
            (!selectedStudiengang || selectedStudiengang.length == 0) &&
            selectedStatus &&
            selectedStatus.length > 0
        ) {
            this.displayedBewerbungen = this.bewerbungen.filter(bewerbung =>
                selectedStatus.includes(bewerbung.applicationstatus)
            );
        } else {
            this.displayedBewerbungen = this.bewerbungen;
        }
    }
}
