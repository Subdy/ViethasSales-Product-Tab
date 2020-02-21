import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductImportSuppliersPage } from './product-import-suppliers.page';

const routes: Routes = [
  {
    path: '',
    component: ProductImportSuppliersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductImportSuppliersPage]
})
export class ProductImportSuppliersPageModule {}
