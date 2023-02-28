import { Component, OnInit } from '@angular/core';
import { StudiengangService } from 'src/app/services/studiengang.service';

@Component({
  selector: 'app-studiengang-overview',
  templateUrl: './studiengang-overview.component.html',
  styleUrls: ['./studiengang-overview.component.scss'],
})
export class StudiengangOverviewComponent implements OnInit {
  public loggedIn: boolean = true;
  public displayedColumns: string[];
  public studiengaenge: any;

  constructor(public studiengangService: StudiengangService) {
    if (this.loggedIn) {
      this.displayedColumns = [
        'title',
        'degree',
        'startDate',
        'active',
        'link',
      ];
    } else {
      this.displayedColumns = ['title', 'degree', 'startDate', 'link'];
    }
  }

  ngOnInit(): void {
    this.studiengangService.getAllStudiengaenge().subscribe((studiengaenge) => {
      this.studiengaenge = studiengaenge;
      console.log(studiengaenge);
    });
  }
}
