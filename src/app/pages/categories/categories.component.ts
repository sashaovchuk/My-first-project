import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoriesService]
})
export class CategoriesComponent implements OnInit {
  adminCategories: Array<ICategory> = [];
  search: string;
  constructor(private categoriesService: CategoriesService) {
    this.getCategory()
  }
  ngOnInit() {
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
}
