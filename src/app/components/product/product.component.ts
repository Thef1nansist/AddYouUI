import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) {

    activatedRoute.params.subscribe((params) => {
      if(params.id) {
        api.getProductById(params.id)
        .subscribe({
          next:(res => {
           this.product = res;
          })
        })
      }
    })
   }

  ngOnInit(): void {
    
  }

  addToCart() {
    
  }

}
