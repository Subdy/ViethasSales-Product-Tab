import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell1',
  templateUrl: './sell1.page.html',
  styleUrls: ['./sell1.page.scss'],
})
export class Sell1Page implements OnInit {
  startDay = '2019-12';
  endDay = "2019-12-08";
  searchQuery: string = '';
  items: string[];
  listgoods:Array<any>=[
    {
    name:'Giày Thể Thao Trẻ Em',
    inventory:'02',
    price:'234,560',
    sku:'ADGD123',
    entryprice:'234,560'
  },
  {
    name:'Giày Thể Thao ',
    inventory:'07',
    price:'234,560',
    sku:'ADGD123',
    entryprice:'234,560'
  },
  {
    name:'Giày Converse',
    inventory:'04',
    price:'234,560',
    sku:'ADGD123',
    entryprice:'234,560'
  },
  {
    name:'Giày Thể Thao Trẻ Em',
    inventory:'05',
    price:'234,560',
    sku:'ADGD123',
    entryprice:'234,560'
  },
  {
    name:'Giày Converse',
    inventory:'04',
    price:'234,560',
    sku:'ADGD123',
    entryprice:'234,560'
  },
  {
    name:'Giày Converse',
    inventory:'04',
    price:'120.000 ',
    sku:'ADGD123',
    entryprice:'245,600'
  },
  {
    name:'Giày Converse',
    inventory:'04',
    price:'120.000',
    sku:'ADGD123',
    entryprice:'234,560'
  }
  ,
  {
    name:'Giày Converse',
    inventory:'04',
    price:'120.000',
    sku:'ADGD123',
    entryprice:'234,560'
  }
  ,
  {
    name:'Giày Converse',
    inventory:'04',
    price:'120.000 ',
    sku:'ADGD123',
    entryprice:'2345600'
  }
];
list_pro:Array<any>=[{id:24}]
  constructor() { }

  ngOnInit() {
  }

}
