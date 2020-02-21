import { Component, OnInit } from "@angular/core";
import { Router, RouterModule, NavigationExtras } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import {
  FirebaseAuth,
  FirebaseQuery
} from "../../../database/firebase.database";
@Component({
  selector: "app-staff-list",
  templateUrl: "./staff-list.page.html",
  styleUrls: ["./staff-list.page.scss"]
})
export class StaffListPage implements OnInit {
  id_employee: 0;
  trigger_popup: boolean;
  mang_a: any;
  id: any;
  list_staff: Array<any>;
  staff_sum: number;
  dataShow: Array<any>;
  number: any;

  constructor(
    public alertCtrl: AlertController,
    private firebaseAuth: FirebaseAuth,
    private firebaseQuery: FirebaseQuery,
    private router: Router,
    public loadingController: LoadingController
  ) {
    this.trigger_popup = false;
    //this.getrecord ();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getrecord();
  }

  gotoDetails(item) {
    let data: NavigationExtras = {
      state: {
        item: item
      }
    };
    this.router.navigate(["/staff-detail"], data);
    /*console.log(item);
    let data = {
      title: item.title,
      description: item.description,
      //image: item.image,
      id: item.id
    };*/
    //this.navCtrl.push(UpdateItemPage, {
    //  data: data
    //});
  }

  triggerPopup() {
    this.trigger_popup = !this.trigger_popup;
  }

  cancel() {
    this.trigger_popup = false;
  }

  deteleSupplier() {
    this.trigger_popup = false;
    console.log("xoa thanh cong");
    this.firebaseAuth.deleteEmployee("KRomFgT5NxfGLdT7rV8Y62H3SCs1").then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  searchStaff(event) {
    this.dataShow = new Array();
    console.log(this.list_staff);
    let value = this.change_alias(event.target.value.toLowerCase());
    this.dataShow = this.list_staff.filter(arr => {
      console.log(arr);
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

  getrecord() {
    this.list_staff = new Array();

    this.firebaseQuery
      .getTasks("employees")
      .then(
        res => {
          for (let i in res.docs) {
            if (res.docs[i].data().email != "s@gmail.com") {
              this.list_staff.push(res.docs[i].data());
              this.list_staff[this.list_staff.length - 1].id = res.docs[i].id;
            }
          }
          // this.list_staff = this.list_staff.sort((n1, n2) => {
          //   if (n1.name > n2.name) return 1;
          //   return -1;
          // });
          this.number = res.docs.length;
          this.dataShow = this.list_staff;
        },
        err => {
          console.log(err);
        }
      )
      .catch(err => {
        console.log(err);
      });
  }
}
