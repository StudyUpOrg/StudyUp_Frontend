import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BewerbungService } from 'src/app/services/bewerbung/bewerbung.service';

@Component({
    selector: 'app-bewerbung-status',
    templateUrl: './bewerbung-status.component.html',
    styleUrls: ['./bewerbung-status.component.scss'],
})
export class BewerbungStatusComponent implements OnInit, OnDestroy {
    public bewerbungStatus!: string;
    private paramsSubscription!: Subscription;

    constructor(
        private bewerbungService: BewerbungService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.paramsSubscription = this.route.params.subscribe(params => {
            this.bewerbungService
                .getBewerbungStatusById(params['id'])
                .subscribe((response: any) => {
                    this.bewerbungStatus = response.data.applicationStatusName;
                });
        });
    }

    ngOnDestroy(): void {
        this.paramsSubscription.unsubscribe();
    }
}
