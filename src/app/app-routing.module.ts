import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {AppComponent} from './app.component'
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './components/guards/auth.guard';
import { InvAuthGuard } from './components/guards/invauth.guard';
import {UserAuthGuard} from './components/guards/authUser.guard'

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'login', component: LoginComponent, canActivate: [InvAuthGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [InvAuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'default', component: UserComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
