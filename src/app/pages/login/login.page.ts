import { FirebaseAuth } from "./../../database/firebase.database";
import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  variable: string = "password";
  icon: string = "eye-off";

  validations_form: FormGroup;
  errorMessage: string = "";

  validation_messages = {
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Please enter a valid email." }
    ],
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minlength",
        message: "Password must be at least 5 characters long."
      }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private firebaseAuth: FirebaseAuth
  ) {
    this.tryCheckSignedIn();
  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl(
        "s@gmail.com",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.minLength(5), Validators.required])
      )
    });
  }
  resetPassword() {
  }
  change() {
    if (this.variable === "text") {
      this.variable = "password";
      this.icon = "eye-off";
    } else {
      this.variable = "text";
      this.icon = "eye";
    }
  }

  tryCheckSignedIn() {
    this.firebaseAuth.checkSignedIn().then(resp => {
      if (resp) {
        console.log(this.firebaseAuth.user);
        this.router.navigateByUrl("tabs");
        
      }
    });
  }

  tryLogin(value) {
    this.firebaseAuth.doLogin(value).then(
      () => {
        console.log(this.firebaseAuth.user);
        this.router.navigateByUrl("tabs");
      },
      err => {
        this.errorMessage = err.message;
        console.log(err);
      }
    );
  }

  goRegisterPage() {
    this.router.navigate(["/register"]);
  }
}
