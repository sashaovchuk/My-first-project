import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { SubCategoriesComponent } from './pages/sub-categories/sub-categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { SubbrandsComponent } from './pages/subbrands/subbrands.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { OrderComponent } from './pages/order/order.component';
import { ConfidentialityComponent } from './pages/confidentiality/confidentiality.component';
import { UserAgreementComponent } from './pages/user-agreement/user-agreement.component';
import { AdminComponent } from './admin/admin.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { AdminBrandsComponent } from './admin/admin-brands/admin-brands.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminSubscribersComponent } from './admin/admin-subscribers/admin-subscribers.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // { path: 'categories', component: CategoriesComponent },
  { path: 'categories', component: CategoriesComponent,children:[]},
  // { path: 'categories/', redirectTo: 'categories', pathMatch: 'full' },
  { path: 'categories/:sub-categories', component: SubCategoriesComponent },
  // { path: 'categories/:**', redirectTo: 'categories' },
  { path: 'brands', component: BrandsComponent },
  { path: 'brands/', redirectTo: 'brands', pathMatch: 'full' },
  { path: 'brands/:subbrands', component: SubbrandsComponent },
  // { path: 'brands/:**', redirectTo: 'brands' },
  { path: 'about', component: AboutComponent },
  // { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },/////
  { path: 'contacts', component: ContactsComponent },
  { path: 'order', component: OrderComponent },
  { path: 'confidentiality', component: ConfidentialityComponent },
  { path: 'user-agreement', component: UserAgreementComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'admin-brands', pathMatch: 'full' },
      { path: 'admin-brands', component: AdminBrandsComponent },
      { path: 'admin-category', component: AdminCategoryComponent },
      { path: 'admin-products', component: AdminProductsComponent },
      { path: 'admin-orders', component: AdminOrdersComponent },
      { path: 'admin-subscribers', component: AdminSubscribersComponent },
      { path: '**', redirectTo: 'admin-brands' }
    ]
  },
  {path: '**', redirectTo: 'home'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
