import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  constructor( private barcode: BarcodeScanner) { }

  ngOnInit() {
  }
  scan() {
    this.barcode.scan().then(data => {
      alert(data.text);
    }, err => {
      alert(err);
    });
  }
}
