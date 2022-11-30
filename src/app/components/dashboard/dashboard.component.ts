import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  companies: any;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.api.getCompanies()
    .subscribe({
      next: (res => {
          this.companies = res
          console.log(res);
      }),
      error: (error => {

      })
    })
  }

}
