import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
@Output() sideNavToggled = new EventEmitter<boolean>();
menuStatus: boolean = false;
logging: boolean = false;
unlogin: boolean = false;
  constructor(private auth: AuthService, private api: ApiService) { }
  
  ngOnInit(): void {
    this.logging = this.auth.isLoggedIn();
    this.unlogin = !this.logging;

  }
  SideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  logout() {
    this.unlogin = true;
    this.logging = false;
    this.auth.signOut();
  }
}
