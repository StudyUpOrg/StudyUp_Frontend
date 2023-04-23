import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    constructor(private http: HttpClient) {}

    public getAccountProfilePicture() {
        return this.http.get(
            environment.BACKEND_URL + '/employee/user/profilepicture',
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
                responseType: 'blob',
            }
        );
    }

    public updateAccountProfilePicture(profilePicture: FormData) {
        return this.http.put(
            environment.BACKEND_URL + '/employee/user/profilepicture',
            profilePicture,
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }

    public updateAccountUsername(username: string) {
        return this.http.put(
            environment.BACKEND_URL + '/employee/user/username',
            {
                newUsername: username,
            },
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }

    public updateAccountPassword(password: string) {
        return this.http.put(
            environment.BACKEND_URL + '/employee/user/password',
            {
                newPassword: password,
            },
            {
                headers: new HttpHeaders({
                    token: localStorage.getItem('authToken') || '',
                }),
            }
        );
    }
}
