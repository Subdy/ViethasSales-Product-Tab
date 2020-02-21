import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductImportAddProduct2Page } from './product-import-add-product2.page';

const routes: Routes = [
  {
    path: '',
    component: ProductImportAddProduct2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductImportAddProduct2Page]
})
export class ProductImportAddProduct2PageModule {}
