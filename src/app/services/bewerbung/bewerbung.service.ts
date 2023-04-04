import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class BewerbungService {
  private BACKEND_URL: string = 'https://diedreiprojekt.pythonanywhere.com';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  private createBewerbung(): Observable<any> {
    return this.http.post<number>(this.BACKEND_URL + '/visitor/apply', {});
  }

  private addInformationToBewerbung(bewerbungId: number, bewerbung: any): Observable<any> {
    return this.http.put<any>(this.BACKEND_URL + '/visitor/application/managemant/' + bewerbungId, bewerbung);
  }

  private addFilesToBewerbung(bewerbungId: number, files: any): Observable<any> 
  {
    return this.http.post<any>(this.BACKEND_URL + '/visitor/application/documents/' + bewerbungId, files);
  }

  public sendBewerbung(bewerbung: any, bewerbungFiles: FormData): void {
    this.createBewerbung().subscribe(response => {
      const bewerbungId = response.applicationId;
      this.addInformationToBewerbung(bewerbungId, bewerbung).subscribe(() => {
        this.addFilesToBewerbung(bewerbungId, bewerbungFiles).subscribe(() => {
          this.http.put<any>(this.BACKEND_URL + '/visitor/application/send/' + bewerbungId, {}).subscribe();
        })
      })
    })
  }
}