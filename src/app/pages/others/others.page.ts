import { Component, OnInit } from '@angular/core';
import { RouterModule, Router} from '@angular/router'
@Component({
  selector: 'app-others',
  templateUrl: './others.page.html',
  styleUrls: ['./others.page.scss'],
})
export class OthersPage implements OnInit {

  constructor(private router: Router) {
   }

  ngOnInit() {
  }

  goToManagement() {
    this.router.navigateByUrl('management');
  }
  goToSystem() {
    this.router.navigateByUrl('system');
  }

}
