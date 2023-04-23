import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { StudiengangService } from 'src/app/services/studiengang/studiengang.service';

@Component({
    selector: 'app-studiengang-overview',
    templateUrl: './studiengang-overview.component.html',
    styleUrls: ['./studiengang-overview.component.scss'],
})
export class StudiengangOverviewComponent implements OnInit, OnDestroy {
    public loggedIn!: boolean;
    public displayedColumns!: string[];
    public studiengaenge: any;
    private loggedInSubcription!: Subscription;

    constructor(
        private studiengangService: StudiengangService,
        private notificationService: NotificationService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.displayedColumns = ['title', 'degree', 'startDate', 'link'];
        this.loggedInSubcription = this.authService.$loggedIn.subscribe(
            loggedIn => {
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
            }
        );
    }

    ngOnDestroy(): void {
        this.loggedInSubcription.unsubscribe();
    }

    private getAllStudiengaengeEmployee(): void {
        this.studiengangService.getAllStudiengaengeEmployee().subscribe(
            (response: any) => {
                this.studiengaenge = response.data;
            },
            (error: any) => {
                this.notificationService.displayNotification(error.error.msg);
            }
        );
    }

    private getAllStudiengaengeVisitor(): void {
        this.studiengangService.getAllStudiengaengeVisitor().subscribe(
            (response: any) => {
                this.studiengaenge = response.data;
            },
            (error: any) => {
                this.notificationService.displayNotification(error.error.msg);
            }
        );
    }
}
