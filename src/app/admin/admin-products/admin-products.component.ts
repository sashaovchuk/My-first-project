import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { IBrand } from 'src/app/shared/interfaces/brand.interface';
import { BrandsService } from 'src/app/shared/services/brands.service';
import { NewProduct } from 'src/app/shared/classes/new-product.class';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  providers: [ProductsService, CategoriesService, BrandsService]
})
export class AdminProductsComponent implements OnInit {
  adminProducts: Array<IProduct> = [];
  adminCategories: Array<ICategory> = [];
  adminBrands: Array<IBrand> = [];
  productDescription: string;
  productPrice: number;
  productImage: string;
  productCategory: any;
  productBrand: any;
  productModel: string;
  productMaterial: string;
  productSize: string;
  editStatus: boolean = false;
  editId: number;
  categoryId: number;
  categoryName: string;
  categoryGender: string;
  categoryImage: string;
  brandId: number;
  brandName: string;
  brandImage: string;
  editCategoryName: string;
  select: boolean = false;
  selectCategory: any;
  selectBrand: any;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private brandsService: BrandsService, private prStorage: AngularFireStorage) {
    this.getProduct();
    this.getCategory();
    this.getBrand();
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

  public isAddProduct(): void {
    this.productCategory = this.adminCategories.filter(cat => cat.id === +this.selectCategory)
    this.productBrand = this.adminBrands.filter(brd => brd.id === +this.selectBrand)
    const product: IProduct = new NewProduct(
      0,
      this.productCategory[0],
      this.productBrand[0],
      this.productModel,
      this.productSize,
      this.productMaterial,
      this.productDescription,
      this.productPrice,
      this.productImage
    );
    product.id = this.adminProducts.slice(-1)[0].id + 1;
    this.selectCategory = {}
    this.selectBrand = {}
    this.productModel = '';
    this.productSize = '';
    this.productMaterial = '';
    this.productDescription = '';
    this.productPrice = null;
    this.productImage = '';
    this.productsService.setProducts(product).subscribe(
      () => {
        this.getProduct();
      }
    )
  }

  public isDeleteProduct(product: IProduct): void {
    const id = product.id;
    this.productsService.delProduct(id).subscribe(
      () => {
        this.getProduct();
      }
    )
  }

  public isEditProduct(product: IProduct): void {
    this.selectCategory = product.category.id;
    this.selectBrand = product.brand.id;
    this.productModel = product.model;
    this.productSize = product.size;
    this.productMaterial = product.material;
    this.productDescription = product.description;
    this.productPrice = product.price;
    this.productImage = product.image;
    this.editStatus = true;
    this.editId = product.id;
  }

  public isSaveEditProduct(): void {
    this.productCategory = this.adminCategories.filter(cat => cat.id === +this.selectCategory)
    this.productBrand = this.adminBrands.filter(brd => brd.id === +this.selectBrand)
    const newproduct: IProduct = new NewProduct(
      this.editId,
      this.productCategory[0],
      this.productBrand[0],
      this.productModel,
      this.productSize,
      this.productMaterial,
      this.productDescription,
      this.productPrice,
      this.productImage
    )
    this.productsService.editProduct(newproduct).subscribe(
      () => {
        this.getProduct();
      }
    )
    this.editStatus = false
    this.selectCategory = {}
    this.selectBrand = {}
    this.productModel = ''
    this.productSize = '';
    this.productMaterial = '';
    this.productDescription = '';
    this.productPrice = null;
    this.productImage = ''
  }

  public upload(event): void {
    const id = Math.random().toString(36).substring(2)
    this.ref = this.prStorage.ref(`images/${id}`)
    this.task = this.ref.put(event.target.files[0])
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL()
        this.downloadURL.subscribe(url => this.productImage = url)
      })
    ).subscribe();
  }
}
