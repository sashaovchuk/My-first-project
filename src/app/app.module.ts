import { MbscModule } from '@mobiscroll/angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { MaterialModule } from './material'
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SubCategoriesComponent } from './pages/sub-categories/sub-categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { SubbrandsComponent } from './pages/subbrands/subbrands.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AdminComponent } from './admin/admin.component';
import { OrderComponent } from './pages/order/order.component';
import { ConfidentialityComponent } from './pages/confidentiality/confidentiality.component';
import { UserAgreementComponent } from './pages/user-agreement/user-agreement.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminSubscribersComponent } from './admin/admin-subscribers/admin-subscribers.component';
import { AdminBrandsComponent } from './admin/admin-brands/admin-brands.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { FiletProdCatNamePipe } from './shared/pipes/filet-prod-cat-name.pipe';
//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FilterBrandPipe } from './shared/pipes/filter-brand.pipe';
import { FilterProdBrNamePipe } from './shared/pipes/filter-prod-br-name.pipe';
import { PordFirstPipe } from './shared/pipes/pord-first.pipe';

import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from  'ngx-ui-loader';
import { ngxUiLoaderConfig } from  './preloader-config';

//????
import { MDBBootstrapModule } from 'angular-bootstrap-md';
//library bootstrap
import { CarouselModule } from 'ngx-bootstrap/carousel';
//ng5-slider
import { Ng5SliderModule } from 'ng5-slider';
import { FilterRangePipe } from './shared/pipes/filter-range.pipe';
import { CurrencysPipe } from './shared/pipes/currencys.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';

//carousel
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
//ngx-pagination
import {NgxPaginationModule} from 'ngx-pagination';
// mask for phone number
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CategoriesComponent,
    BrandsComponent,
    AboutComponent,
    ContactsComponent,
    AdminComponent,
    OrderComponent,
    AdminCategoryComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminSubscribersComponent,
    AdminBrandsComponent,
    ProductsComponent,
    FilterPipe,
    SubCategoriesComponent,
    FiletProdCatNamePipe,
    FilterBrandPipe,
    SubbrandsComponent,
    FilterProdBrNamePipe,
    PordFirstPipe,
    ProductDetailsComponent,
    FilterRangePipe,
    CurrencysPipe,
    ConfidentialityComponent,
    UserAgreementComponent,
    LoginComponent,
  ],
  imports: [ 
    MbscModule, 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    OrderModule,
    MaterialModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    CarouselModule,
    CarouselModule.forRoot(),
    Ng5SliderModule,
    ToastrModule.forRoot(),
    NgxHmCarouselModule,
    NgxPaginationModule,
    TextMaskModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
