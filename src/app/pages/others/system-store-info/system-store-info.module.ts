import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SystemStoreInfoPage } from './system-store-info.page';

const routes: Routes = [
  {
    path: '',
    component: SystemStoreInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SystemStoreInfoPage]
})
export class SystemStoreInfoPageModule {}
