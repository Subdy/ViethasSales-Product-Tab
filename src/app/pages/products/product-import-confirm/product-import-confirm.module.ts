import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductImportConfirmPage } from './product-import-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: ProductImportConfirmPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductImportConfirmPage]
})
export class ProductImportConfirmPageModule {}
