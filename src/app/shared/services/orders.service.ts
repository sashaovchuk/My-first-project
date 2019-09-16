import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAdminOrder } from '../interfaces/adminOrder.interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private urlOrder: string;
  constructor(private http: HttpClient) {
    this.urlOrder = 'http://localhost:3000/orders'
  }

  public getOrders(): Observable<Array<IAdminOrder>> {
    return this.http.get<Array<IAdminOrder>>(this.urlOrder)
  }

  public setOrders(order: IAdminOrder): Observable<Array<IAdminOrder>> {
    return this.http.post<Array<IAdminOrder>>(this.urlOrder, order);
  }

  public delOrders(idOrder: number): Observable<Array<IAdminOrder>> {
    return this.http.delete<Array<IAdminOrder>>(`${this.urlOrder}/${idOrder}`);
  }
}
