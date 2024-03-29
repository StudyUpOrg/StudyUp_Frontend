import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgOptimizedImage } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
    public loggedIn!: boolean;
    public profilePicture!: any;
    public formGroup!: FormGroup;
    public oldUsername!: string;
    private loggedInSubscription!: Subscription;

    constructor(
        private authService: AuthService,
        private accountService: AccountService,
        private notificationService: NotificationService,
        private sanitizer: DomSanitizer,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.loggedInSubscription = this.authService.$loggedIn.subscribe(
            loggedIn => {
                this.loggedIn = loggedIn;
                if (this.loggedIn) {
                    this.getProfilePicture();
                    this.initializeFormGroup();
                    this.oldUsername = localStorage.getItem('username') || '';
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.loggedInSubscription.unsubscribe();
    }

    private initializeFormGroup() {
        this.formGroup = this.formBuilder.group({
            username: [localStorage.getItem('username'), Validators.required],
            password: '',
            passwordRepetition: '',
        });
    }

    private getProfilePicture() {
        this.accountService.getAccountProfilePicture().subscribe(
            profilePicture => {
                this.profilePicture = this.sanitizer.bypassSecurityTrustUrl(
                    URL.createObjectURL(profilePicture)
                );
            },
            (error: any) => {
                this.notificationService.displayNotification(error.error.msg);
            }
        );
    }

    public updateProfilePicture(event: any) {
        const picture = event.target.files[0];
        const formDataPicture = new FormData();
        formDataPicture.append('file', picture, picture.name);
        this.accountService
            .updateAccountProfilePicture(formDataPicture)
            .subscribe(
                () => {
                    this.getProfilePicture();
                },
                (error: any) => {
                    this.notificationService.displayNotification(
                        error.error.msg
                    );
                }
            );
    }

    public updateProfileInformation() {
        const password = this.formGroup.value.password;
        const username = this.formGroup.value.username;
        if (password) {
            this.accountService.updateAccountPassword(password).subscribe(
                (response: any) => {
                    this.notificationService.displayNotification(response.msg);
                    if (username != this.oldUsername) {
                        this.accountService
                            .updateAccountUsername(username)
                            .subscribe(
                                (response: any) => {
                                    this.notificationService.displayNotification(
                                        response.msg
                                    );
                                    this.authService.loggedIn.next(false);
                                },
                                (error: any) => {
                                    this.notificationService.displayNotification(
                                        error.msg
                                    );
                                }
                            );
                    }
                },
                (error: any) => {
                    this.notificationService.displayNotification(
                        error.error.msg
                    );
                }
            );
        } else if (username != this.oldUsername) {
            this.accountService.updateAccountUsername(username).subscribe(
                (response: any) => {
                    this.notificationService.displayNotification(response.msg);
                    this.authService.loggedIn.next(false);
                },
                (error: any) => {
                    this.notificationService.displayNotification(
                        error.error.msg
                    );
                }
            );
        }
    }

    public logout(): void {
        this.authService.logout();
    }
}
