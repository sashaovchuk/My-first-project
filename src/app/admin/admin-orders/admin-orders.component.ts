import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { IAdminOrder } from 'src/app/shared/interfaces/adminOrder.interfaces';
import { IOrder } from 'src/app/shared/interfaces/order.interfaces';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  newAdminOrders: Array<IAdminOrder>
  newOrder: Array<IOrder>
  constructor(private orderService: OrdersService) {
    this.getOrders()
  }

  ngOnInit() {
  }

  public more(moreDetails: Array<IOrder>): void {
    this.newOrder = moreDetails
  }

  private getOrders(): void {
    this.orderService.getOrders().subscribe(
      data => {
        this.newAdminOrders = data;
      },
      err => {
        console.log(err)
      }
    )
  }

  public isDeleteOrder(order: IAdminOrder): void {
    const id = order.id;
    this.orderService.delOrders(id).subscribe(
      () => {
        this.getOrders();
      }
    )
  }
}
