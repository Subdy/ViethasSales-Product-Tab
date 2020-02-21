import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductImportAddSuppliersPage } from './product-import-add-suppliers.page';

const routes: Routes = [
  {
    path: '',
    component: ProductImportAddSuppliersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductImportAddSuppliersPage]
})
export class ProductImportAddSuppliersPageModule {}
