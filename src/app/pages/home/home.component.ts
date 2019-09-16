import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { SubscribersService } from 'src/app/shared/services/subscribers.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adminProducts: Array<IProduct> = []
  ind = 0
  index = 0;
  spd = 8000;
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
    else if (index == 7 || index == 8) {
      this.index = 0
    }
  }
  avatars = [
    { url: 'https://gdmoda.ru/wp-content/uploads/2019/08/slide1.jpg' },
    { url: 'https://gdmoda.ru/wp-content/uploads/2019/08/slide2.jpg' },
    { url: 'https://gdmoda.ru/wp-content/uploads/2019/08/slide3-1.jpg' },
    { url: 'https://gdmoda.ru/wp-content/uploads/2019/08/slide4.jpg' },
  ]

  fullName: string;

  constructor(private subscribersService: SubscribersService, private productService: ProductsService, private firestore: AngularFirestore, private toastr: ToastrService) {
    this.getProduct()
  }

  ngOnInit() {
    this.resetForm()
  }

  resetForm(myForm?: NgForm) {
    if (myForm != null)
      myForm.resetForm()
    this.subscribersService.formDatas = {
      id: null,
      fullName: '',
      email: ''
    }
  }
  onSubscribe(myForm: NgForm): void {
    let data = Object.assign({}, myForm.value);
    delete data.id;
    if (myForm.value.id == null)
      this.firestore.collection('subscribers').add(data)
    else
      this.firestore.doc('subscriber/' + myForm.value.id).update(data);
    this.resetForm(myForm)
    this.toastr.success('You are subscribe!!!')
  }

  private getProduct(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.adminProducts = data.slice(-9)
      },
      err => {
        console.log(err)
      }
    )
  }
}
