import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HeaderComponent } from 'src/app/header/header.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  closeResult!: string;
  companyForm!: FormGroup
  productForm!: FormGroup
  public Mycompany:any;
  public products:any;
  private JwtObj: any;
  visibilityButtonCreate: boolean = false;
  isMyCompanyExisting: boolean = false;

  constructor(
    private auth: AuthService, 
    private api: ApiService,
    config: NgbModalConfig,
    private modalService: NgbModal) { 
      config.backdrop = 'static';
      config.keyboard = false;
  }

  open(content: any) {
		this.modalService.open(content);
	}

  putButtonCreateCompany() {
    this.visibilityButtonCreate = true;
  }

  createCompany() {
    if (this.companyForm.valid) {
      this.companyForm.patchValue({
        "CreatorId": this.JwtObj.sub})
        this.companyForm.patchValue({
          "Products": []})
          console.log(this.companyForm.value)
        this.api.addCompany(this.companyForm.value)
        .subscribe({
          next:(res => {
            console.log(res)
          })
        })
    }
  }

  createProduct() {
    this.productForm.patchValue({
      "CompanyId": this.Mycompany[0].id})
    this.productForm.patchValue({
      "SoldCounter": 0})
    if (this.productForm.valid)
    {
      console.log(this.productForm.value)
      this.api.addProduct(this.productForm.value)
      .subscribe({
        next: (res => {
          console.log(res);
        }),
        error: (err => {
            console.log(err)
        })
      })
    }

  }

  getMyProduct() {
    this.api.getProductsByCompanyId(this.Mycompany[0].id)
    .subscribe({
      next:(res => {
        this.products = res;
        this.products = this.products[0].products
        console.log(this.products)
      })
    })
  }

  addMyProduct() {

  }

  ngOnInit(): void {
    this.JwtObj = this.auth.decodeJWT();
  
    this.companyForm = new FormGroup ({
      'CreatorId' : new FormControl(''),
      'Name' : new FormControl(''), 
      'Address' : new FormControl(''), 
      'ImageSource' : new FormControl(''), 
      'Phone' : new FormControl(''), 
      'Description' : new FormControl(''),
      'Products': new FormControl('')
    })

    this.productForm = new FormGroup({
      'CompanyId' : new FormControl(''),
      'Name' : new FormControl(''), 
      'Price' : new FormControl(''), 
      'ImageSource' : new FormControl(''),
      'Description' : new FormControl(''),
      'SoldCounter' : new FormControl('')
    })
    this.api.getCompanyAdmin(this.JwtObj.sub).
    subscribe({
      next: res => {
        if (Object.keys(res).length > 0) {
          console.log(res)
          this.Mycompany = res;
          this.isMyCompanyExisting = true;
          this.getMyProduct();
          
        }

      }
    })
  }

  logout() {
    this.auth.signOut();
  }

}