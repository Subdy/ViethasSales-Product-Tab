import { Component, OnInit } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
@Component({
  selector: 'app-opening-stock',
  templateUrl: './opening-stock.page.html',
  styleUrls: ['./opening-stock.page.scss'],
})
export class OpeningStockPage implements OnInit {
  startDay = '2019-12';
  endDay = "2019-12-08";
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

  constructor(private router:Router) { }

  ngOnInit() {
  }
  gotoproductdetail2(){
    this.router.navigateByUrl('product-detail2');
  }
  gotoproductscan2(){
    this.router.navigateByUrl('product-import-scan2');
  }
}
