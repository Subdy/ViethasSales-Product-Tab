import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: 'overview',
        loadChildren: "../overview/overview.module#OverViewPageModule"
      },
      {
        path: 'report',
        loadChildren: "../report/report.module#ReportPageModule"
      },
      {
        path: 'products',
        loadChildren: "../products/products.module#ProductsPageModule"
      },
      {
        path: 'sell',
        loadChildren: '../sell/sell.module#SellPageModule'
      },
      {
        path: 'others',
        loadChildren: '../others/others.module#OthersPageModule'
      },
      {
        path: "",
        redirectTo: "overview",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
