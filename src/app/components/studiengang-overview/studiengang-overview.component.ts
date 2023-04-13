import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StudiengangService } from 'src/app/services/studiengang/studiengang.service';

@Component({
    selector: 'app-studiengang-overview',
    templateUrl: './studiengang-overview.component.html',
    styleUrls: ['./studiengang-overview.component.scss'],
})
export class StudiengangOverviewComponent implements OnInit {
    public loggedIn!: boolean;
    public displayedColumns!: string[];
    public studiengaenge: any;

    constructor(
        private studiengangService: StudiengangService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.displayedColumns = ['title', 'degree', 'startDate', 'link'];
        this.authService.$loggedIn.subscribe(loggedIn => {
            this.loggedIn = loggedIn;
            if (this.loggedIn) {
                this.displayedColumns = [
                    'title',
                    'degree',
                    'startDate',
                    'active',
                    'link',
                ];
                this.getAllStudiengaengeEmployee();
            } else {
                this.displayedColumns = [
                    'title',
                    'degree',
                    'startDate',
                    'link',
                ];
                this.getAllStudiengaengeVisitor();
            }
        });
    }

    private getAllStudiengaengeEmployee(): void {
        this.studiengangService
            .getAllStudiengaengeEmployee()
            .subscribe((studiengaenge: any) => {
                this.studiengaenge = studiengaenge;
            });
    }

    private getAllStudiengaengeVisitor(): void {
        this.studiengangService
            .getAllStudiengaengeVisitor()
            .subscribe((studiengaenge: any) => {
                this.studiengaenge = studiengaenge;
            });
    }
}
