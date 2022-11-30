import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { HeaderComponent } from 'src/app/header/header.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private auth: AuthService, 
    private router: Router,
    private toast: NgToastService
    ) { }

  submitLogin() {
    console.log(this.loginForm.value)
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
      'UserName': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('',  
      [
        Validators.required,
         Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ])
    })
  }

  onLogin() {
    if(this.loginForm.valid) {
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res => {
          console.log(res)
          if(res.isAdmin && res.access_token != null) {
            this.loginForm.reset();
            this.toast.success({detail: "SUCCESS", summary: "Вы успешно авторизованы!", duration: 5000})
            this.auth.storeToken(res.access_token, res.isAdmin);
            localStorage.setItem('admin', res.isAdmin)
            console.log(res);
            // this.header.logging = true;
            // this.header.unlogin = false;
            this.router.navigate(['/admin'])
          }
          else if (res.access_token != null){
            this.auth.storeToken(res.access_token, res.isAdmin);
            this.loginForm.reset();
            this.toast.success({detail: "SUCCESS", summary: "Вы успешно авторизованы!", duration: 5000})
            localStorage.setItem('admin', res.isAdmin)
            // this.header.logging = true;
            // this.header.unlogin = false;
            this.router.navigate([''])
          }
          else {
            this.toast.error({detail: "ERROR", summary: "Введены не верные креда!", duration: 5000})
          }
        }),
        error:(err => {
          this.toast.error({detail: "ERROR", summary: "Что-то пошло не так", duration: 5000})
        })
      })
    }
    else {
      // ValidateForm.validateAllFormFileds(this.signUpForm)
    }
  }

}
