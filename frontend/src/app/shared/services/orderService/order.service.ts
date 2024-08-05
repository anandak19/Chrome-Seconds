import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { orderData } from '../../../core/models/watch-details';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'order';

  constructor(
    private _http: HttpClient  ) {}

  // create order and payment request 
  createRzPayOrder(amount: number, order: orderData[]): Observable<any> {
    return this._http
      .post(`${this.apiUrl}/create-order`, { amount, order })
  }

  // get all paid orders 
  getAllOrders(): Observable<any>{
    return this._http
    .get(`${this.apiUrl}`)
  }

  deleteOrderById(orderId: string): Observable<any>{
    const params = new HttpParams().set('id', orderId);
    return this._http
    .delete(`${this.apiUrl}`, {
       params
    })
  }
}
