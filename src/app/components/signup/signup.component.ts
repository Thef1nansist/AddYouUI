import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private toast: NgToastService) { }

  ngOnInit(): void {

    this.signUpForm = new FormGroup ({
      'UserName': new FormControl('', [Validators.required, Validators.email]),
      'isAdmin': new FormControl('', Validators.required),
      'password': new FormControl('',  
      [
        Validators.required,
         Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ])
    })
  }

  OnSingUp(){
    if(this.signUpForm.valid) {
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res => {
          if (res) {
            this.signUpForm.reset();
            this.toast.success({detail: "SUCCESS", summary: "Вы успешно зарегистрировались!", duration: 5000})
            this.router.navigate(['/login'])
          }
        }),
        error:(err => {
          this.toast.error({detail: "ERROR", summary: "Что-то пошло не так", duration: 5000})
        })
      })
      console.log(this.signUpForm.value)
    }
    else {
      this.toast.error({detail: "ERROR", summary: "Форма не валидна", duration: 5000})
    }
  }

}
