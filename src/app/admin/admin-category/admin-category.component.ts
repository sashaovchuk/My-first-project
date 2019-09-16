import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { NewCategory } from 'src/app/shared/classes/new-category.class';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css'],
  providers: [CategoriesService]
})
export class AdminCategoryComponent implements OnInit {
  adminCategories: Array<ICategory> = []
  categoryName: string;
  categoryGender: string;
  editId: number;
  editStatus: boolean = false;
  categoryImage: string;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private categoriesService: CategoriesService, private ctStorage: AngularFireStorage) {
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

  public isAddCategory(): void {
    const category: ICategory = new NewCategory(
      0,
      this.categoryName,
      this.categoryGender,
      this.categoryImage
    );
    category.id = this.adminCategories.slice(-1)[0].id + 1;
    this.categoryName = '';
    this.categoryGender = '';
    this.categoryImage = ''
    this.categoriesService.setCategories(category).subscribe(
      () => {
        this.getCategory();
      }
    )
  }

  public isDeleteCategory(category: ICategory): void {
    const idCategory = category.id
    this.categoriesService.delCategories(idCategory).subscribe(
      () => {
        this.getCategory();
      }
    )
  }

  public isEditCategory(category: ICategory): void {
    this.editId = category.id;
    this.categoryName = category.name;
    this.categoryGender = category.gender;
    this.categoryImage = category.image;
    this.editStatus = true
  }

  public isSaveEditCategory(): void {
    const newcategory: ICategory = new NewCategory(
      this.editId,
      this.categoryName,
      this.categoryGender,
      this.categoryImage
    )
    this.categoriesService.editCategories(newcategory).subscribe(
      () => {
        this.getCategory();
      }
    )
    this.editStatus = false
    this.categoryName = ''
    this.categoryGender = ''
    this.categoryImage = ''
  }

  public upload(event): void {
    const id = Math.random().toString(36).substring(2)
    this.ref = this.ctStorage.ref(`images/${id}`)
    this.task = this.ref.put(event.target.files[0])
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL()
        this.downloadURL.subscribe(url => this.categoryImage = url)
      })
    ).subscribe();
  }
}
