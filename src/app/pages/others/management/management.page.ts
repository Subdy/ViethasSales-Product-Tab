import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-management',
  templateUrl: './management.page.html',
  styleUrls: ['./management.page.scss'],
})
export class ManagementPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  gotosupplier() {
    this.router.navigateByUrl('supplier-list');
  }
  gotoinventory() {
    this.router.navigateByUrl('inventory');
  }
  translateStaffList(){
    this.router.navigateByUrl('staff-list');
  }
  addStaff(){
    this.router.navigateByUrl('staff-add');
  }
}
