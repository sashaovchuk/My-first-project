import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/products'
   }

  public getProdDetails(id: number): Observable<IProduct>{
    return this.http.get<IProduct>(`${this.url}/${id}`)
  }
}
