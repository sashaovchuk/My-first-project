import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers:[ ProductsService ]
})
export class ProductsComponent implements OnInit {
  adminProducts: Array<IProduct> = [];
  constructor(private productsService: ProductsService) {
    this.getProduct()
  }
  ngOnInit() {
  }
  private getProduct(): void {
    this.productsService.getProducts().subscribe(
      data => {
        this.adminProducts = data;
      },
      err => {
        console.log(err)
      }
    )
  }
}
