import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { IOrder } from 'src/app/shared/interfaces/order.interfaces';
import { NewOrder } from 'src/app/shared/classes/new-order.class';
import { IAdminOrder } from 'src/app/shared/interfaces/adminOrder.interfaces';
import { NewAdminOrder } from 'src/app/shared/classes/new-adminOrder.class';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/shared/services/users.service';
import { NewRealUser } from 'src/app/shared/classes/new-realUser.class';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [OrdersService]
})
export class OrderComponent implements OnInit {
  adminOrders: Array<IOrder>
  newAdminOrders: Array<IAdminOrder>
  check: boolean = false;
  fullName: string;
  phone: number;
  adress: string;
  suma: number;
  user: NewRealUser[]
  persons: NewRealUser;
  ph: number;
  ad: string;
  who: string;
  indicate: boolean = true
  emploee: NewAdminOrder = {
    id: null,
    products: null,
    fullName: '',
    phone: null,
    adress: null,
    suma: null
  }
  phoneMask = ['+', '3', '8', ' ', '(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
  constructor(private orderService: OrdersService, private usersService: UsersService, private toastr: ToastrService) {
    this.usersService.getUser().subscribe(adminUser => {
      this.user = adminUser.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as NewRealUser
      })
      if (sessionStorage.length > 0 && JSON.parse(sessionStorage.getItem('names'))!='Хто ви?') {
        this.who = JSON.parse(sessionStorage.getItem('names'))
        for (let i = 0; i < this.user.length; i++) {
          if (this.user[i].fname + ' ' + this.user[i].sname == this.who) {
            this.persons = this.user[i]
            this.fullName = this.who
            this.phone = this.persons.phone
            this.adress = this.persons.adress
          }
        }
      }
    })
    this.indicate = true
    this.getOrders()
    this.getStorage()
    this.result()
  }

  ngOnInit() {
  }
  public result(): void {
    if (localStorage.length > 0) {
      let counter = []
      this.adminOrders.forEach(function (element) {
        let elementCounter = element.count
        let elementPrices = element.product.price
        counter.push(elementCounter * elementPrices)
      })
      this.suma = counter.reduce((sum, val) => sum + val)
    }
  }

  public getStorage(): void {
    if (localStorage.length > 0) {
      this.adminOrders = JSON.parse(localStorage.getItem('orders'))
      this.check = true
    }
    else {
      this.check = false
    }
  }

  minus(order: NewOrder): void {
    let orders = JSON.parse(localStorage.getItem('orders'))
    let remove = orders.filter(or => or.id == order.id)[0]
    let ind = orders.indexOf(remove)
    if (remove.count > 1) {
      remove.count = --remove.count
    }
    orders.splice(ind, 1, remove)
    localStorage.clear
    localStorage.setItem('orders', JSON.stringify(orders))
    this.getStorage()
    this.result()
  }

  plass(order: NewOrder): void {
    let orders = JSON.parse(localStorage.getItem('orders'))
    let remove = orders.filter(or => or.id == order.id)[0]
    let ind = orders.indexOf(remove)
    if (remove.count >= 0) {
      remove.count = ++remove.count
    }
    orders.splice(ind, 1, remove)
    localStorage.clear
    localStorage.setItem('orders', JSON.stringify(orders))
    this.getStorage()
    this.result()
  }

  public isDeleteOrder(order): void {
    let orders = JSON.parse(localStorage.getItem('orders'))
    let remove = orders.filter(or => or.id == order.id)[0]
    let ind = orders.indexOf(remove)
    orders.splice(ind, 1)
    localStorage.clear
    localStorage.setItem('orders', JSON.stringify(orders))
    if (JSON.parse(localStorage.getItem('orders')).length == 0) {
      localStorage.removeItem('orders')
    }
    this.getStorage()
    this.result()
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

  public isAddOrder(): void {
    this.result()
    const adminOrder: IAdminOrder = new NewAdminOrder(
      0,
      this.adminOrders,
      this.fullName,
      this.phone,
      this.adress,
      this.suma
    )
    this.indicate = false
    this.fullName = ''
    this.phone = null
    this.adress = ''
    if (this.newAdminOrders.length > 0) {
      adminOrder.id = this.newAdminOrders.slice(-1)[0].id + 1;
    }
    this.orderService.setOrders(adminOrder).subscribe(
      () => {
        this.getOrders();
      }
    )
    localStorage.removeItem('orders')
    this.toastr.success('Ви успішно здійснили замовлення!!!')
    this.getStorage()
  }
}