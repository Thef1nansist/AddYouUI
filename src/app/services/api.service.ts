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

  getCompanyAdmin(AdminId: string) {
    return this.http.put<any>(this.baseUrlCompanies, JSON.stringify(AdminId));
  }

  getProductItemByUser(userId: string) {
    return this.http.get(`${this.baseUrlCompanies}/GetCoffeeItemByUserAsync?idUser=${userId}`);
  }

  getByCompaniesIdUser() {
    return this.http.get(`${this.baseUrlCompanies}/GetByCoffeeHousesIdUser?userId=${localStorage.getItem('UserId')}`);
  }

  GetPopularCompanies() {
    return this.http.get(`${this.baseUrlCompanies}/GetPopularCompanies`);
  }

  SellProductAsync(userId: string, id: Int32Array) {
    return this.http.get(`${this.baseUrlCompanies}/sellProduct/${id}/${userId}`);
  } 

}
