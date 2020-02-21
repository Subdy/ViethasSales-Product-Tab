import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-return-cart",
  templateUrl: "./return-cart.page.html",
  styleUrls: ["./return-cart.page.scss"]
})
export class ReturnCartPage implements OnInit {
  constructor() {}

  ngOnInit() {}
  list_cart: Array<any> = [
    {
      id: 1,
      name: "Áo Khoát Chống Tia Uv",
      money: "250,000",
      total: "500,000"
    },
    {
      id: 2,
      name: "Áo Khoát Chống Tia Uv",
      money: "250,000",
      total: "500,000"
    },
    {
      id: 3,
      name: "Áo Khoát Chống Tia Uv",
      money: "250,000",
      total: "500,000"
    },
    {
      id: 4,
      name: "Áo Khoát Chống Tia Uv",
      money: "250,000",
      total: "500,000"
    }
  ];
}
