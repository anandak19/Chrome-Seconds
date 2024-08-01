import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3002/api/order';

  constructor(private _http: HttpClient) {}

  createRzPayOrder(amount: number): Observable<any>  {
    return this._http.post(`${this.apiUrl}/create-order`, {amount})
  }
}
