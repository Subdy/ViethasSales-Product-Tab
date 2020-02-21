import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-category-product-list',
  templateUrl: './category-product-list.page.html',
  styleUrls: ['./category-product-list.page.scss'],
})
export class CategoryProductListPage implements OnInit {
  list_pro:Array<any>=[
    {
      name:'Áo khoát chống nắng',
      sku:'SFGH4325534',
      category:'áo chống nắng'
  },
  {
    name:'Áo khoát chống nắng',
    sku:'SFGH4325534',
    category:'áo chống nắng'
},
{
  name:'Áo khoát chống nắng',
  sku:'SFGH4325534',
  category:'áo chống nắng'
},
{
  name:'Áo khoát chống nắng',
  sku:'SFGH4325534',
  category:'áo chống nắng'
},
{
  name:'Áo khoát chống nắng',
  sku:'SFGH4325534',
  category:'áo chống nắng'
},

]
  constructor() { }

  ngOnInit() {
  }

}
