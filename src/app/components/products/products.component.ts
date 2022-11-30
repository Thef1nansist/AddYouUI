import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) { 

    activatedRoute.params.subscribe((params) => {
      if(params.id) {
        api.getProductsByCompanyId(params.id)
        .subscribe({
          next:(res => {
            var temp:any = res;
            this.products = temp[0].products
            console.log(this.products);
          })
        })
      }
    })

  }

  ngOnInit(): void {
    console.log(this.products)
  }

}
