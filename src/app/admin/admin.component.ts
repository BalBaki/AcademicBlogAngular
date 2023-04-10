import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from '../services/alertify.service';
import { User } from './user';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService,
    private accountService: AccountService,
    private router: Router
  ) { }

  loginForm: FormGroup;
  user: User = new User();

  ngOnInit() {
    if (localStorage.getItem("isLogged"))
      this.router.navigate(["adminpanel"])
    this.loginForm = this.formBuilder.group({
      eMail: ["", Validators.required],
      password: ["", Validators.required]
    });



  }

  login() {
    this.user = Object.assign({}, this.loginForm.value)
    this.accountService.login(this.user)
    if (this.accountService.isLoggedIn()) {
      this.alertifyService.success("Başarıyla giriş yaptınız...")
      setTimeout(() => {
        this.router.navigate(['adminpanel'])
      }, 500)

    }
    else {
      this.alertifyService.error("Email veya şifreniz yanlış");
    }
  }

  reset() {
    this.router.navigate(["blog"])
  }

}
