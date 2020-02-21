import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.page.html",
  styleUrls: ["./product-list.page.scss"]
})
export class ProductListPage implements OnInit {
  searchQuery: string = "";
  items: string[];
  listgoods: Array<any> = [
    {
      name: "Giày Thể Thao Trẻ Em",
      inventory: "02",
      price: "234,560",
      sku: "ADGD123",
      entryprice: "234,560"
    },
    {
      name: "Giày Thể Thao ",
      inventory: "07",
      price: "234,560",
      sku: "ADGD123",
      entryprice: "234,560"
    },
    {
      name: "Giày Converse",
      inventory: "04",
      price: "234,560",
      sku: "ADGD123",
      entryprice: "234,560"
    },
    {
      name: "Giày Thể Thao Trẻ Em",
      inventory: "05",
      price: "234,560",
      sku: "ADGD123",
      entryprice: "234,560"
    },
    {
      name: "Giày Converse",
      inventory: "04",
      price: "234,560",
      sku: "ADGD123",
      entryprice: "234,560"
    },
    {
      name: "Giày Converse",
      inventory: "04",
      price: "120.000 ",
      sku: "ADGD123",
      entryprice: "245,600"
    },
    {
      name: "Giày Converse",
      inventory: "04",
      price: "120.000",
      sku: "ADGD123",
      entryprice: "234,560"
    },
    {
      name: "Giày Converse",
      inventory: "04",
      price: "120.000",
      sku: "ADGD123",
      entryprice: "234,560"
    },
    {
      name: "Giày Converse",
      inventory: "04",
      price: "120.000 ",
      sku: "ADGD123",
      entryprice: "2345600"
    }
  ];
  list_pro: Array<any> = [{ id: 24 }];
  constructor(private router: Router) {}

  ngOnInit() {}
  gotoproductdetail() {
    this.router.navigate(["/product-detail"]);
  }
}
