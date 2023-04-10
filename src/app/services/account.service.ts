import { Injectable } from '@angular/core';
import { User } from '../admin/user';

@Injectable()
export class AccountService {

  constructor() { }

  loggedIn = false;
  
  login(user : User) : boolean{
    if(user.eMail == "bakibal1994@gmail.com" && user.password == "123456"){
      this.loggedIn = true;
      localStorage.setItem("isLogged",this.loggedIn.toString());
      return true;
    }
    return false;
  }

  isLoggedIn(){
    return localStorage.getItem("isLogged");
  }

  logOut(){
    localStorage.removeItem("isLogged");
    localStorage.removeItem("multipleLogin");
    this.loggedIn = false;
  }

  multipleLogin(){
    localStorage.setItem("multipleLogin","true");

  }

  


}
