import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },
  { path: "home", loadChildren: "./pages/home/home.module#HomePageModule" },
  {
    path: "new-item",
    loadChildren: "./pages/new-item/new-item.module#NewItemPageModule"
  },
  {
    path: "update-item",
    loadChildren: "./pages/update-item/update-item.module#UpdateItemPageModule"
  },
  {
    path: "register",
    loadChildren: "./pages/register/register.module#RegisterPageModule"
  },

  {
    path: "report-staff",
    loadChildren:
      "./pages/report/report-staff/report-staff.module#ReportStaffPageModule"
  },
  {
    path: "report-supplier",
    loadChildren:
      "./pages/report/report-supplier/report-supplier.module#ReportSupplierPageModule"
  },
  {
    path: "report-products",
    loadChildren:
      "./pages/report/report-products/report-products.module#ReportProductsPageModule"
  },
  {
    path: "report",
    loadChildren: "./pages/report/report.module#ReportPageModule"
  },
  {
    path: "report-revenue",
    loadChildren:
      "./pages/report/report-revenue/report-revenue.module#ReportRevenuePageModule"
  },
  {
    path: "report-category",
    loadChildren:
      "./pages/report/report-category/report-category.module#ReportCategoryPageModule"
  },
  {
    path: "overview",
    loadChildren: "./pages/overview/overview.module#OverViewPageModule"
  },
  { path: "tabs", loadChildren: "./pages/tabs/tabs.module#TabsPageModule" },
  { path: "sell", loadChildren: "./pages/sell/sell.module#SellPageModule" },
  {
    path: "return-info",
    loadChildren:
      "./pages/products/return-info/return-info.module#ReturnInfoPageModule"
  },
  {
    path: "sell-bill",
    loadChildren: "./pages/sell/sell-bill/sell-bill.module#SellBillPageModule"
  },
  {
    path: "others",
    loadChildren: "./pages/others/others.module#OthersPageModule"
  },
  {
    path: "management",
    loadChildren:
      "./pages/others/management/management.module#ManagementPageModule"
  },
  {
    path: "scan",
    loadChildren: "./pages/sell/scan/scan.module#ScanPageModule"
  },

  {
    path: "category",
    loadChildren: "./pages/others/category/category.module#CategoryPageModule"
  },
  {
    path: "product-list",
    loadChildren:
      "./pages/products/product-list/product-list.module#ProductListPageModule"
  },
  {
    path: "product-detail",
    loadChildren:
      "./pages/products/product-detail/product-detail.module#ProductDetailPageModule"
  },
  {
    path: "product-import",
    loadChildren:
      "./pages/products/product-import/product-import.module#ProductImportPageModule"
  },
  {
    path: "product-import-suppliers",
    loadChildren:
      "./pages/products/product-import-suppliers/product-import-suppliers.module#ProductImportSuppliersPageModule"
  },
  {
    path: "product-import-detail",
    loadChildren:
      "./pages/products/product-import-detail/product-import-detail.module#ProductImportDetailPageModule"
  },
  {
    path: "product-import-confirm",
    loadChildren:
      "./pages/products/product-import-confirm/product-import-confirm.module#ProductImportConfirmPageModule"
  },
  {
    path: "product-import-add-suppliers",
    loadChildren:
      "./pages/products/product-import-add-suppliers/product-import-add-suppliers.module#ProductImportAddSuppliersPageModule"
  },
  {
    path: "product-import-add-product",
    loadChildren:
      "./pages/products/product-import-add-product/product-import-add-product.module#ProductImportAddProductPageModule"
  },
  {
    path: "sell1",
    loadChildren: "./pages/sell/sell1/sell1.module#Sell1PageModule"
  },
  {
    path: "add-products",
    loadChildren:
      "./pages/products/add-products/add-products.module#AddProductsPageModule"
  },
  {
    path: "product-detail2",
    loadChildren:
      "./pages/products/product-detail2/product-detail2.module#ProductDetail2PageModule"
  },
  {
    path: "product-import-cart",
    loadChildren:
      "./pages/products/product-import-cart/product-import-cart.module#ProductImportCartPageModule"
  },
  {
    path: "system-store-info",
    loadChildren:
      "./pages/others/system-store-info/system-store-info.module#SystemStoreInfoPageModule"
  },
  {
    path: "system-printer",
    loadChildren:
      "./pages/others/system-printer/system-printer.module#SystemPrinterPageModule"
  },
  {
    path: "opening-stock",
    loadChildren:
      "./pages/others/opening-stock/opening-stock.module#OpeningStockPageModule"
  },
  {
    path: "product-import-scan2",
    loadChildren:
      "./pages/products/product-import-scan2/product-import-scan2.module#ProductImportScan2PageModule"
  },
  {
    path: "product-import-add-product2",
    loadChildren:
      "./pages/products/product-import-add-product2/product-import-add-product2.module#ProductImportAddProduct2PageModule"
  },
  {
    path: "system",
    loadChildren: "./pages/others/system/system.module#SystemPageModule"
  },
  {
    path: "return-cart",
    loadChildren:
      "./pages/products/return-cart/return-cart.module#ReturnCartPageModule"
  },
  {
    path: "sell-info",
    loadChildren: "./pages/sell/sell-info/sell-info.module#SellInfoPageModule"
  },
  {
    path: "return-bill",
    loadChildren:
      "./pages/products/return-bill/return-bill.module#ReturnBillPageModule"
  },
  {
    path: "notification",
    loadChildren:
      "./pages/notification/notification.module#NotificationPageModule"
  },
  {
    path: "report-cost",
    loadChildren:
      "./pages/report/report-cost/report-cost.module#ReportCostPageModule"
  },
  {
    path: "report-cost-detail",
    loadChildren:
      "./pages/report/report-cost-detail/report-cost-detail.module#ReportCostDetailPageModule"
  },
  {
    path: "report-output",
    loadChildren:
      "./pages/report/report-output/report-output.module#ReportOutputPageModule"
  },
  {
    path: "report-inventory",
    loadChildren:
      "./pages/report/report-inventory/report-inventory.module#ReportInventoryPageModule"
  },
  {
    path: "supplier-list",
    loadChildren:
      "./pages/others/supplier-list/supplier-list.module#SupplierListPageModule"
  },
  {
    path: "supplier-add",
    loadChildren:
      "./pages/others/supplier-add/supplier-add.module#SupplierAddPageModule"
  },
  {
    path: "supplier-detail",
    loadChildren:
      "./pages/others/supplier-detail/supplier-detail.module#SupplierDetailPageModule"
  },
  {
    path: "inventory",
    loadChildren:
      "./pages/others/inventory/inventory.module#InventoryPageModule"
  },
  {
    path: "sales",
    loadChildren: "./pages/others/sales/sales.module#SalesPageModule"
  },
  {
    path: "sales-detail",
    loadChildren:
      "./pages/others/sales-detail/sales-detail.module#SalesDetailPageModule"
  },
  {
    path: "sell-history",
    loadChildren:
      "./pages/others/sell-history/sell-history.module#SellHistoryPageModule"
  },
  {
    path: "bill-detail",
    loadChildren:
      "./pages/others/bill-detail/bill-detail.module#BillDetailPageModule"
  },
  {
    path: "sales-add",
    loadChildren: "./pages/others/sales-add/sales-add.module#SalesAddPageModule"
  },
  {
    path: "category-product-list",
    loadChildren:
      "./pages/others/category-product-list/category-product-list.module#CategoryProductListPageModule"
  },
  {
    path: "category-choose",
    loadChildren:
      "./pages/others/category-choose/category-choose.module#CategoryChoosePageModule"
  },
  {
    path: "staff-detail",
    loadChildren:
      "./pages/others/staff-detail/staff-detail.module#StaffDetailPageModule"
  },
  {
    path: "staff-add",
    loadChildren: "./pages/others/staff-add/staff-add.module#StaffAddPageModule"
  },
  {
    path: "staff-list",
    loadChildren:
      "./pages/others/staff-list/staff-list.module#StaffListPageModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
