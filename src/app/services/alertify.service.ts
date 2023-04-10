import { Injectable } from '@angular/core';

declare let alertify: any;

@Injectable({
  providedIn: 'root'
})

export class AlertifyService {

  constructor() { }


  success(message: string) {
    alertify.success(message);
  }


  error(message: string) {
    alertify.error(message);
  }

  alert(message: string) {
    alertify
      .alert(message, function () {
        alertify.success('OK');
      });
  }



}


