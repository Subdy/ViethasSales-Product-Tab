import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { FirebaseQuery } from "./../../../database/firebase.database";
@Component({
  selector: "app-supplier-list",
  templateUrl: "./supplier-list.page.html",
  styleUrls: ["./supplier-list.page.scss"]
})
export class SupplierListPage implements OnInit {
  number: any;
  items: Array<any>;
  dataShow: Array<any>;
  search: any;
  change: any;
  constructor(private router: Router, private firebaseQuery: FirebaseQuery) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.getData();
  }
  gotoSupplierAdd() {
    this.router.navigateByUrl("supplier-add");
  }
  
  searchStaff(event) {
    this.dataShow = new Array();
    let value = this.change_alias(event.target.value.toLowerCase());
    this.dataShow = this.items.filter(arr => {
      if (
        this.change_alias(arr.name.toLowerCase()).indexOf(value) !== -1 ||
        this.change_alias(arr.email.toLowerCase()).indexOf(value) !== -1 ||
        arr.phone.toString().indexOf(value) !== -1
      ) {
        return true;
      }
      return false;
    });
    this.number = this.dataShow.length;
  }

  change_alias(alias) {
    let str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      " "
    );
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str;
  }

  //option changed will sort by name
  changeOption(event) {
    if (event.target.value == "AZ") {
      this.sortAZ();
    } else {
      this.sortZA();
    }
  }
  //sort by name from A to Z
  sortAZ() {
    this.dataShow = this.dataShow.sort((n1, n2) => {
      if (n1.name > n2.name) return 1;
      return -1;
    });
  }
  //sort by name from Z to A
  sortZA() {
    this.dataShow = this.dataShow.sort((n1, n2) => {
      if (n1.name < n2.name) return 1;
      return -1;
    });
  }
  // get all data in SUPPLIERS collection
  getData() {
    this.items = new Array();
    this.firebaseQuery
      .getTasks("suppliers")
      .then(
        res => {
          for (let i in res.docs) {
            this.items.push(res.docs[i].data());
            this.items[this.items.length - 1].id = res.docs[i].id;
          }
          this.items = this.items.sort((n1, n2) => {
            if (n1.name > n2.name) return 1;
            return -1;
          });
          this.number = res.docs.length;
          this.dataShow = this.items;
        },
        err => {
          console.log(err);
        }
      )
      .catch(err => {
        console.log(err);
      });
  }
  //chuyen trang Supplier Detail
  gotoSupplierDetail(item) {
    let data: NavigationExtras = {
      state: {
        item: item
      }
    };
    this.router.navigate(["/supplier-detail"], data);
  }
}
