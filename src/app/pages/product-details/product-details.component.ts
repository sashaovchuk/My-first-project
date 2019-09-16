import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductDetailsService } from 'src/app/shared/services/product-details.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { IOrder } from 'src/app/shared/interfaces/order.interfaces';
import { NewOrder } from 'src/app/shared/classes/new-order.class';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [ProductsService, OrdersService]
})
export class ProductDetailsComponent implements OnInit {
  adminProducts: Array<IProduct> = []
  adminOrders: Array<IOrder> = []
  orders: Array<IOrder> = []
  product: IProduct
  productId: number;
  currentCategory: string;
  count: number = 1;
  index = 0;
  speed = 5000;
  infinite = true;
  direction = 'right';
  directionToggle = true;
  autoplay = true;
  indexChanged(index) {
    if (index == 1 || index == 2) {
      this.index = 0
    }
    else if (index == 4 || index == 5) {
      this.index = 3
    }
  }

  constructor(private productService: ProductsService, private productDetailService: ProductDetailsService, private orderService: OrdersService, private route: ActivatedRoute) {
    const ss = this.route.fragment.subscribe((fragment: string) => {
      this.currentCategory = fragment
    })
    this.getProduct()
    this.getDetails()

  }

  ngOnInit() {
  }

  public getURL(id: number): void {
    this.productDetailService.getProdDetails(id).subscribe(
      data => {
        this.product = data
      },
      err => {
        console.log(err);
      }
    )
  }

  public getDetails(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'))
    this.productDetailService.getProdDetails(this.productId).subscribe(
      data => {
        this.product = data
      },
      err => {
        console.log(err);
      }
    )
  }

  private getProduct(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.adminProducts = data.slice(-4);
      },
      err => {
        console.log(err)
      }
    )
  }

  minus(): void {
    if (this.count > 1) this.count--
  }
  plass(): void {
    this.count++
  }

  public isAddToOrderPage(): void {
    let order: IOrder = new NewOrder(
      0,
      this.product,
      this.count
    )
    if (localStorage.length > 0) {
      this.orders = JSON.parse(localStorage.getItem('orders'))
      order.id = this.orders.slice(-1)[0].id + 1
    }
    this.orders.push(order)
    localStorage.setItem('orders', JSON.stringify(this.orders))
  }
}

