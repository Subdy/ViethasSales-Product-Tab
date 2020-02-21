import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router'
import { Route } from '@angular/compiler/src/core';
@Component({
  selector: 'app-system',
  templateUrl: './system.page.html',
  styleUrls: ['./system.page.scss'],
})
export class SystemPage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }
  gotosystemprinter(){
    this.router.navigateByUrl('system-printer');
  }
  gotosystemstoreinfo(){
    this.router.navigateByUrl('system-store-info');
  }
}
