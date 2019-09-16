import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/shared/services/brands.service';
import { IBrand } from 'src/app/shared/interfaces/brand.interface';
import { NewBrand } from 'src/app/shared/classes/new-brand.class';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-brands',
  templateUrl: './admin-brands.component.html',
  styleUrls: ['./admin-brands.component.css'],
  providers: [BrandsService]
})
export class AdminBrandsComponent implements OnInit {
  adminBrands: Array<IBrand> = [];
  brandName: string;
  editId: number;
  editStatus: boolean = false;
  brandLogo: string
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private brandsService: BrandsService, private brStorage: AngularFireStorage, private firestor: AngularFirestore) {
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

  public isAddBrand(): void {
    const brand: IBrand = new NewBrand(
      0,
      this.brandName,
      this.brandLogo
    );
    brand.id = this.adminBrands.slice(-1)[0].id + 1;
    this.brandName = '';
    this.brandLogo = ''
    this.brandsService.setBrands(brand).subscribe(
      () => {
        this.getBrand();
      }
    )
  }

  public isDeleteBrand(brand: IBrand): void {
    const idBrand = brand.id
    this.brandsService.delBrands(idBrand).subscribe(
      () => {
        this.getBrand();
      }
    )
  }

  public isEditBrand(brand: IBrand): void {
    this.editId = brand.id;
    this.brandName = brand.name;
    this.brandLogo = brand.image;
    this.editStatus = true
  }

  public isSaveEditBrand(): void {
    const newBrand: IBrand = new NewBrand(
      this.editId,
      this.brandName,
      this.brandLogo
    )
    this.brandsService.editBrands(newBrand).subscribe(
      () => {
        this.getBrand();
      }
    )
    this.editStatus = false
    this.brandName = ''
    this.brandLogo = ''
  }

  public upload(event): void {
    const id = Math.random().toString(36).substring(2)
    this.ref = this.brStorage.ref(`images/${id}`)
    this.task = this.ref.put(event.target.files[0])
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL()
        this.downloadURL.subscribe(url => this.brandLogo = url)
      })
    ).subscribe();
  }
}
