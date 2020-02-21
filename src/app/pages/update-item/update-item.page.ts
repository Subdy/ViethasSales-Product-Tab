import { FirebaseQuery } from "./../../database/firebase.database";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup
} from "@angular/forms";

@Component({
  selector: "app-update-item",
  templateUrl: "./update-item.page.html",
  styleUrls: ["./update-item.page.scss"]
})
export class UpdateItemPage implements OnInit {
  item: any;
  edit_item_form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private firebaseQuery: FirebaseQuery
  ) {}

  ngOnInit() {
    this.item = this.router.getCurrentNavigation().extras.state.item;
    this.edit_item_form = this.formBuilder.group({
      title: new FormControl(this.item.title, Validators.required),
      description: new FormControl(this.item.description, Validators.required)
    });
    console.log(this.item);
  }

  goBack() {
    this.router.navigate(["/home"]);
  }

  updateItem(value) {
    console.log(value);
    let data = { ...this.item };
    (data.title = value.title),
      (data.description = value.description),
      delete data.id;
    this.firebaseQuery
      .updateTask("data", this.item.id, data)
      .then(
        () => {
          this.goBack();
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
