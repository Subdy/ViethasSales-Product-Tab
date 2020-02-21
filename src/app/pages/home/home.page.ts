import { Component, OnInit } from "@angular/core";
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from "@angular/router";
import { FirebaseQuery, FirebaseAuth } from "./../../database/firebase.database";
//import { UpdateItemPage } from "../update-item/update-item";
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  items: Array<any>;

  constructor(
    private router: Router,
    private navCtrl: NavController, 
    private firebaseQuery: FirebaseQuery,
    private firebaseAuth: FirebaseAuth
  ) {

  }

  ngOnInit() {
    
  }
  ionViewWillEnter() {
    this.getData();
  }
  
  getData() {
    this.items = new Array();
    this.firebaseQuery
      .getTasks("data")
      .then(
        res => {
          for (let i in res.docs) {
            this.items.push(res.docs[i].data());
            this.items[this.items.length - 1].id = res.docs[i].id;
          }
        },
        err => {
          console.log(err);
        }
      )
      .catch(err => {
        console.log(err);
      });    
  }

  gotoDetails(item) {
    let data: NavigationExtras = {
      state: {
        item: item
      }
    };
    this.router.navigate(["/update-item"], data);
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

  logout() {    
    this.firebaseAuth.doLogout().then(() => {
      console.log("logout succcess");
      this.router.navigate(["/login"])
    });
  }
}
