import { Component, OnInit } from '@angular/core';
import { IBrand } from 'src/app/shared/interfaces/brand.interface';
import { BrandsService } from 'src/app/shared/services/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  adminBrands: Array<IBrand> = [];
  searchBrand: string;
  constructor(private brandsService: BrandsService) {
    this.getBrand()
  }
  ngOnInit() {
  }
  private getBrand(): void {
    this.brandsService.getBrands().subscribe(
      data => {
        this.adminBrands = data;
      },
      err => {
        console.log(err)
      }
    )
  }
}
