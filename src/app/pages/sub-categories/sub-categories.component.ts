import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { Options, LabelType } from 'ng5-slider'

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css'],
  providers: [ProductsService]
})
export class SubCategoriesComponent implements OnInit {
  adminProducts: Array<IProduct>;
  currentCategory: string;
  filteredStatus: { name: string, status: string, reverse: boolean };
  order: string = '';
  reverse: boolean = false;
  servers = [
    {
      name: 'Сортувати від A-Z',
      status: 'brand.name',
      reverse: false
    },
    {
      name: 'Сортувати від Z-A',
      status: 'brand.name',
      reverse: true
    },
    {
      name: 'Сортувати до мінімальної ціни',
      status: 'price',
      reverse: true
    },
    {
      name: 'Сортувати до максимальної ціни',
      status: 'price',
      reverse: false
    }
  ];
  sortedCollection: any[]
  maxCeil: number;
  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    step: 1,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '$';
        case LabelType.High:
          return value + '$';
        default:
          return value + '$';
      }
    }
  };

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private orderPipe: OrderPipe) {
    const ss = this.route.fragment.subscribe((fragment: string) => {
      this.currentCategory = fragment
    })
    this.sortedCollection = this.orderPipe.transform(this.adminProducts, this.order);
    this.getProduct()


  }
  ngOnInit() {
  }

  private getProduct(): void {
    this.productsService.getProducts().subscribe(
      data => {
        let newArr = [];
        for (let i = 0; i < data.length; i++) {
          newArr.push(data[i].price)
        }
        this.minValue = Math.min.apply(null, newArr);
        this.maxValue = Math.max.apply(null, newArr);
        if (this.maxValue >= this.options.ceil) {
          this.maxCeil = Math.round(this.maxValue / 100) * 100 + 100
          const newOptions: Options = Object.assign({}, this.options);
          newOptions.ceil = this.maxCeil;
          this.options = newOptions;
        }
        this.adminProducts = data;
      },
      err => {
        console.log(err)
      }
    )
  }

  public setOrder(filteredStatus: { name: string, status: string, reverse: boolean }): void {
    this.order = this.filteredStatus.status
    this.reverse = this.filteredStatus.reverse
  }
}
