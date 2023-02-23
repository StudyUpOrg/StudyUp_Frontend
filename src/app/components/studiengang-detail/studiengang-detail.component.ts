import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-studiengang-detail',
  templateUrl: './studiengang-detail.component.html',
  styleUrls: ['./studiengang-detail.component.scss'],
})
export class StudiengangDetailComponent implements OnInit {
  public loggedIn: boolean = false;
  public studiengang = {
    id: 1,
    title: 'Toller Studiengang',
    degree: 'Bachelor',
    startDate: new Date(2023, 2, 3),
    description: 'Dieser Studiengang ist supertoll.',
    active: false,
  };

  constructor(private authService: AuthService) {
    // authService.$loggedIn.subscribe((loggedIn) => (this.loggedIn = loggedIn));
  }

  ngOnInit(): void {}
}
