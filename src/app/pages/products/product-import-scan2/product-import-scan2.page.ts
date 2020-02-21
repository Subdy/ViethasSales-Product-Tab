import { Component, OnInit } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
@Component({
  selector: 'app-product-import-scan2',
  templateUrl: './product-import-scan2.page.html',
  styleUrls: ['./product-import-scan2.page.scss'],
})
export class ProductImportScan2Page implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  gotoproductaddproduct2(){
    this.router.navigateByUrl('product-import-add-product2');
  }
}
