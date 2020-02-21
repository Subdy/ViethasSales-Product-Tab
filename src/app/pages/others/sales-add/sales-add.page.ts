import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-add',
  templateUrl: './sales-add.page.html',
  styleUrls: ['./sales-add.page.scss'],
})
export class SalesAddPage implements OnInit {
  listds:Array<any>=[
    {name:'giày thể thao trẻ em'},
    {name:'giày thể thao nữ'},
    {name:'giày thể thao Nam'},
    {name:'giày thể thao convrese'},
    {name:'giày thể thao nike'},
    {name:'giày thể thao ah dũng ao sen'}
];
  constructor() { }

  ngOnInit() {
  }

}
