import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()

export class MultipleLoginGuard implements CanActivate {
    constructor(
        private router: Router
    ) { }

   


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(localStorage.getItem("multipleLogin") == null) 
            return true;
       else{
        alert("Admin paneli başka bir sayfada açıktır...")
        this.router.navigate(["blog"])
        return false;
       }
    }
}