import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-detail',
  templateUrl: './sales-detail.page.html',
  styleUrls: ['./sales-detail.page.scss'],
})
export class SalesDetailPage implements OnInit {
  music: string;
  month:'1990-02-19';
  month1:'1990-02-19';
  year: number;

  searchQuery: string = '';
  items: string[];
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
