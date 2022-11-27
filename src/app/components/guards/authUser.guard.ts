import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}

  canActivate(): boolean {
    if(this.auth.isLoggedIn() && !localStorage.getItem('admin')) {
        return true
    }
    else {
      this.toast.error({detail:"ERROR", summary:"Please Login First!"});
      this.router.navigate(['login'])
      return false;
    }
  }
  
}
