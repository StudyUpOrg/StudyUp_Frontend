import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public loginForm!: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<LoginComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    public login(): void {
        const formValues = this.loginForm.value;

        if (formValues.username && formValues.password) {
            this.authService.login(formValues.username, formValues.password);
            this.dialogRef.close();
        }
    }
}
