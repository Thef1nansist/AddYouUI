import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrlCompanies: string = 'http://localhost:65204/api/companies'

  constructor(private http: HttpClient) { }

  getCompanies() {
    return this.http.get<any>(this.baseUrlCompanies);
  }

  addCompany(companyObj: any) {
    return this.http.post<any>(this.baseUrlCompanies, companyObj );
  }

  addProduct(productObj: any) {
    return this.http.post<any>(`${this.baseUrlCompanies}/AddProduct`, productObj);
  }

  getCompanyAdmin(AdminId: string) {
    return this.http.get(`${this.baseUrlCompanies}/GetByCompaniesIdUser?userId=${AdminId}`);
  }

  getProductItemByUser(userId: string) {
    return this.http.get(`${this.baseUrlCompanies}/GetProductByUserAsync?idUser=${userId}`);
  }

  getByCompaniesIdUser() {
    return this.http.get(`${this.baseUrlCompanies}/GetByCompaniesIdUser?userId=${localStorage.getItem('UserId')}`);
  }

  getPopularCompanies() {
    return this.http.get(`${this.baseUrlCompanies}/GetPopularCompanies`);
  }

  getProductsByCompanyId(companyId: string) {
    return this.http.get(`${this.baseUrlCompanies}/GetByCompanyId?companyId=${companyId}`)
  }

  SellProductAsync(userId: string, id: Int32Array) {
    return this.http.get(`${this.baseUrlCompanies}/sellProduct/${id}/${userId}`);
  } 

}
