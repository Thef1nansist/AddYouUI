import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/header/header.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public companies:any = [];

  constructor(private auth: AuthService, private api: ApiService) { 
  }

  ngOnInit(): void {
    this.api.getCompanies()
    .subscribe(res => {
      this.companies = res;
    })
  }

  logout() {
    this.auth.signOut();
  }

}
