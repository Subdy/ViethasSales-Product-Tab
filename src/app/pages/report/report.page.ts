import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
@Component({
  selector: 'page-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  gotocategory() {
    this.router.navigateByUrl('report-category');
  }
  gotorevenue() {
    this.router.navigateByUrl('report-revenue');
  }
  gotoproduct() {
    this.router.navigateByUrl('report-products');
  }
  gotosupplier() {
    this.router.navigateByUrl('report-supplier');
  }
  gotostaff() {
    this.router.navigateByUrl('report-staff');
  }
  gotoreportcost(){
    this.router.navigateByUrl('report-cost');
  }
  gotoreportinventory(){
    this.router.navigateByUrl('report-inventory');
  }
  gotoreportoutput(){
    this.router.navigateByUrl('report-output');
  }
}
