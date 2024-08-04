import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/orderService/order.service';
import { dbOrder } from '../../../core/models/orders';
import { CommonModule, DatePipe } from '@angular/common';
import { ProductManagementService } from '../../../shared/services/productServices/product-management.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe,CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  // make interface for this 
  orders!: dbOrder[]
  showOrder: boolean = false
  currentOrder!: any

  constructor (private _orderService: OrderService, private _productService: ProductManagementService) {}



  getAllOrders(){
    this._orderService.getAllOrders().subscribe(
      (res) => {
        this.orders = res
        console.log("ya",this.orders);
        
      }, (err) => {
        console.error(err);
      }
    )
  }

  // open orders list
  openOrder(order: any){
    this.showOrder = true
    this.currentOrder = order
    console.log("order",this.currentOrder);
    
    order.forEach((orderItem: { productId: string; quantity: number; }, index: string | number) => {
      this._productService.getProductById(orderItem.productId).subscribe(
        (productData) => {
          console.log("product",productData);
          order[index].productId = productData;
          // console.log("order",order);
        },
        (error) => {
          console.error('Error fetching product data:', error);
        }
      );
    });
  }

  // close orders list
  closeOrder() {
    this.currentOrder.forEach((orderItem: any) => {
        // Restore the original productId
        orderItem.productId = orderItem.productId._id;
    });
    this.showOrder = false;
  }

  // delete an order
  deleteOrder(id: string){
    this._orderService.deleteOrderById(id).subscribe(
      (res)=> {
        this.getAllOrders()
      }, (err) => {
        console.error(err);
      }
    )
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getAllOrders()
  }
}
