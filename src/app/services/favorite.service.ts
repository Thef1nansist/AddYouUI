import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private baseUrlFavorites: string = 'http://localhost:65204/api/favorites'

  constructor(private http: HttpClient, private router: Router) { }

  createFavoriteCompany(addModel: any) {
    return this.http.post<any>(this.baseUrlFavorites, addModel);
  }

  getFavoriteCompanies(userId: string) {
    return this.http.get<any>(`${this.baseUrlFavorites}/favorites?userId=${localStorage.getItem('UserId')}`);
  }

  getOrderedProduct() {
    return this.http.get<any>(`${this.baseUrlFavorites}/orderedProduct?userId=${localStorage.getItem('UserId')}`);
  }

  getSameFavoritesCompanies(CompanyId: Int32Array) {
    return this.http.get<any>(`${this.baseUrlFavorites}/favorites/${localStorage.getItem('UserId')}/${CompanyId}`);
  }

}
