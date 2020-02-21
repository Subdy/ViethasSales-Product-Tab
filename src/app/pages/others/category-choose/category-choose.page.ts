import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-choose',
  templateUrl: './category-choose.page.html',
  styleUrls: ['./category-choose.page.scss'],
})
export class CategoryChoosePage implements OnInit {
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
