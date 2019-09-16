import { Injectable } from '@angular/core';
import { IBrand } from '../interfaces/brand.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NewBrand } from '../classes/new-brand.class';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  // formData: NewBrand
  private urlBrand: string;
  constructor(private http: HttpClient) {
    this.urlBrand = 'http://localhost:3000/brands'
  }

  public getBrands(): Observable<Array<IBrand>> {
    return this.http.get<Array<IBrand>>(this.urlBrand)
  }

  public setBrands(brand: IBrand): Observable<Array<IBrand>> {
    return this.http.post<Array<IBrand>>(this.urlBrand, brand);
  }

  public delBrands(idBrand: number): Observable<Array<IBrand>> {
    return this.http.delete<Array<IBrand>>(`${this.urlBrand}/${idBrand}`);
  }

  public editBrands(brand: IBrand): Observable<Array<IBrand>> {
    return this.http.put<Array<IBrand>>(`${this.urlBrand}/${brand.id}`, brand);
  }
}
