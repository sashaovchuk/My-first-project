import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { NewRealUser } from 'src/app/shared/classes/new-realUser.class';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { IAdminOrder } from 'src/app/shared/interfaces/adminOrder.interfaces';
import { IOrder } from 'src/app/shared/interfaces/order.interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  adminCategories: Array<ICategory> = [];
  newAdminOrders: Array<IAdminOrder>
  newOrder: Array<IOrder>
  check: boolean = false
  checker: boolean
  who: string
  log: string;
  pass: string;
  names: string;
  settings: string;
  phone: number;
  adress: string;
  ph: number;
  ad: string;
  human: boolean = false
  persons: NewRealUser
  user: NewRealUser[]
  phoneMask = ['+', '3', '8', ' ', '(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]
  constructor(private categoriesService: CategoriesService,private orderService: OrdersService, private usersService: UsersService, private firestore: AngularFirestore, private toastr: ToastrService) {
    this.getCategory()
    this.getOrders()
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
            this.settings = this.who
            this.ph = this.persons.phone
            this.ad = this.persons.adress
          }
        }
        document.getElementById('form3').style.display = 'block'
        document.getElementById('form1').style.display = 'none'
      }
      else {
        this.who = 'Хто ви?'
      }
    })
  }

  public haveHistory(): void{
    for(let i=0;i<this.newAdminOrders.length;i++){
      console.log(this.newAdminOrders[i].fullName)
      let name = this.newAdminOrders[i].fullName
      if(name == this.who){
        this.checker = true
      }
      else{
        this.checker = false
      }
    }
  }

  public onEdit(): void{
    this.getOrders()
  }

  private getCategory(): void {
    this.categoriesService.getCategories().subscribe(
      data => {
        this.adminCategories = data;
      },
      err => {
        console.log(err)
      }
    )
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

  public more(moreDetails: Array<IOrder>): void {
    this.newOrder = moreDetails
  }

  faind(): void {
    if (this.user.find(x => x.login == this.log && x.password === this.pass)) {
      for (let i = 0; i < this.user.length; i++) {
        if (this.user[i].login == this.log) {
          this.who = this.user[i].fname + ' ' + this.user[i].sname
          this.settings = this.user[i].fname + ' ' + this.user[i].sname
          this.persons = this.user[i]
          this.ph = this.persons.phone
          this.ad = this.persons.adress
        }
      }
      document.getElementById('form3').style.display = 'block'
      document.getElementById('Login').style.display = 'none'
      document.getElementById('form1').style.display = 'none'
      this.getSS()
    }
    else {
      let mess = confirm('Невірний логін або пароль. Хочете продовжити як Гість?')
      if (mess == true) {
        this.who = 'Гість'
        document.getElementById('form3').style.display = 'block'
        document.getElementById('Login').style.display = 'none'
        document.getElementById('form1').style.display = 'none'
        this.getSS()
      }
      else if (mess == false) {
        this.who = ''
        document.getElementById('Login').style.display = 'block'
        this.log = ''
        this.pass = ''
      }
    }
  }
  getSS(): void {
    if (sessionStorage.length > 0) {
      sessionStorage.removeItem('names')
      this.names = JSON.parse(sessionStorage.getItem('names'))
      sessionStorage.setItem('names', JSON.stringify(this.who))
    }
    sessionStorage.setItem('names', JSON.stringify(this.who))
    this.log = ''
    this.pass = ''
  }
  exit(): void {
    this.who = 'Хто ви?'
    this.getSS()
    document.getElementById('Login').style.display = 'block'
    document.getElementById('form3').style.display = 'none'
    document.getElementById('form1').style.display = 'block'
  }
  signin(): void {
    document.getElementById('Login').style.display = 'block';
  }
  exitModal(): void {
    document.getElementById('Login').style.display = 'none';
  }
  reestr(): void {
    document.getElementById('form1').style.display = 'none'
    document.getElementById('form2').style.display = 'block'
    document.getElementById('form3').style.display = 'none'
  }
  finReestr(): void {
    sessionStorage.removeItem('names')
    document.getElementById('form1').style.display = 'block'
    document.getElementById('form2').style.display = 'none'
    document.getElementById('form3').style.display = 'none'
  }

  ngOnInit() {
    this.resetForm()
  }

  get(): number {
    if (localStorage.length > 0) {
      this.check = false
      return JSON.parse(localStorage.getItem('orders')).length;
    }
    else {
      this.check = true
    }
  }

  resetForm(myForm?: NgForm) {
    if (myForm != null)
      myForm.resetForm()
    this.usersService.formUser = {
      id: null,
      fname: '',
      sname: '',
      login: '',
      password: '',
      phone: null,
      adress: ''
    }
  }
  onRegister(myForm: NgForm): void {
    let data = Object.assign({}, myForm.value);
    delete data.id;
    if (myForm.value.id == null)
      this.firestore.collection('users').add(data)
    else
      this.firestore.doc('user/' + myForm.value.id).update(data);
    this.resetForm(myForm)
    this.toastr.success('You are registred!!!')
  }
}