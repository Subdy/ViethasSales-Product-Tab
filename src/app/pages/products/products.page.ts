import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'page-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  gotoproductlist(){
    this.router.navigateByUrl('product-list');
  }
  gotoproductimport(){
    this.router.navigateByUrl('product-import');
  }
  
}
