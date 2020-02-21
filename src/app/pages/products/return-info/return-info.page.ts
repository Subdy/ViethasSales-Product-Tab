import { Component, OnInit } from '@angular/core';
import { FormsModule,ReactiveFormsModule, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-return-info',
  templateUrl: './return-info.page.html',
  styleUrls: ['./return-info.page.scss'],
})
export class ReturnInfoPage implements OnInit {
  customer: FormGroup;
  show:boolean = true;
  items = [
    {
      cost: 120000,
      quantity: 20,
    },
    {
      cost: 120000,
      quantity: 20,
    },
    {
      cost: 120000,
      quantity: 20,
    },
    {
      cost: 120000,
      quantity: 20,
    },
    {
      cost: 120000,
      quantity: 20,
    },{
      cost: 120000,
      quantity: 20,
    },
    {
      cost: 120000,
      quantity: 20,
    }
  ];
  total = 4039500;
  constructor() { }

  ngOnInit() {
  }
  
}
