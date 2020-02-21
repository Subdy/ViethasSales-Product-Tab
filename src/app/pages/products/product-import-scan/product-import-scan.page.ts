import { Component, OnInit } from '@angular/core';
import { Router, RouterModule} from '@angular/router';
@Component({
  selector: 'app-product-import-scan',
  templateUrl: './product-import-scan.page.html',
  styleUrls: ['./product-import-scan.page.scss'],
})
export class ProductImportScanPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  gotoaddproduct(){
    this.router.navigateByUrl('product-import-add-product');
  }
}
