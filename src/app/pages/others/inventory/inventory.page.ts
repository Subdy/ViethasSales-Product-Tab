import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  datashow:Array<any>;
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
  constructor() { }

  ngOnInit() {
  }
  searchStaff(event){
    this.datashow=new Array();
    let value = this.change_alias(event.target.value.toLowerCase());
    this.datashow = this.listgoods.filter(arr => {
      if(this.change_alias(arr.name.toLowerCase()).indexOf(value) !== -1) {
        return true;
      }
      return false;
    });
    console.log(this.datashow);
  }
  change_alias(alias) {
    let str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ + /g," ");
    str = str.trim();
    return str;
  }

}
