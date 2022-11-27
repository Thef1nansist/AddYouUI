import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class InvAuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}

  canActivate(): boolean {
    if(this.auth.isLoggedIn()) {
        this.toast.warning({detail:"Warning", summary:"Вы уже авторизованы"});
        this.router.navigate([`${this.router.onSameUrlNavigation}`]) // нужно как-то найти норм вариант, так выбивает 404
        return false;
      }
      else {
        return true;
      }
  }  
}
