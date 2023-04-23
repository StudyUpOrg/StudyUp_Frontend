import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BewerbungService } from 'src/app/services/bewerbung/bewerbung.service';

@Component({
    selector: 'app-bewerbung-overview',
    templateUrl: './bewerbung-overview.component.html',
    styleUrls: ['./bewerbung-overview.component.scss'],
})
export class BewerbungOverviewComponent implements OnInit, OnDestroy {
    public loggedIn!: boolean;
    public studiengangForm!: FormControl;
    public statusForm!: FormControl;
    public displayedBewerbungen!: any[];
    public displayedColumns!: string[];
    public studiengangNames!: Set<string>;
    public statusNames!: Set<string>;
    private bewerbungen!: any[];
    private loggedInSubscription!: Subscription;

    constructor(
        private authService: AuthService,
        private bewerbungService: BewerbungService
    ) {}

    ngOnInit(): void {
        this.displayedColumns = [
            'courseName',
            'receiptDate',
            'firstName',
            'lastName',
            'status',
            'link',
        ];
        this.loggedInSubscription = this.authService.$loggedIn.subscribe(
            loggedIn => {
                this.loggedIn = loggedIn;
                if (loggedIn) {
                    this.getBewerbungen();
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.loggedInSubscription.unsubscribe();
    }

    private getBewerbungen() {
        this.bewerbungService.getAllBewerbungen().subscribe((response: any) => {
            this.bewerbungen = response.data;
            this.displayedBewerbungen = this.bewerbungen;
            this.studiengangNames = new Set(
                this.bewerbungen.map(bewerbung => bewerbung.courseName)
            );
            this.statusNames = new Set(
                this.bewerbungen.map(
                    bewerbung => bewerbung.applicationStatusName
                )
            );
            this.studiengangForm = new FormControl();
            this.statusForm = new FormControl();
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
                    selectedStudiengang.includes(bewerbung.courseName) &&
                    selectedStatus.includes(bewerbung.applicationStatusName)
            );
        } else if (
            selectedStudiengang &&
            selectedStudiengang.length > 0 &&
            (!selectedStatus || selectedStatus.length == 0)
        ) {
            this.displayedBewerbungen = this.bewerbungen.filter(bewerbung =>
                selectedStudiengang.includes(bewerbung.courseName)
            );
        } else if (
            (!selectedStudiengang || selectedStudiengang.length == 0) &&
            selectedStatus &&
            selectedStatus.length > 0
        ) {
            this.displayedBewerbungen = this.bewerbungen.filter(bewerbung =>
                selectedStatus.includes(bewerbung.applicationStatusName)
            );
        } else {
            this.displayedBewerbungen = this.bewerbungen;
        }
    }
}
