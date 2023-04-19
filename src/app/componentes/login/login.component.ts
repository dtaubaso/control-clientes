import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;

  constructor(
    private router: Router, 
    private flashMessages: FlashMessagesService,
    private loginservice: LoginService
  ){}

    login(){
      this.loginservice.login(this.email, this.password)
        .then( res => {
          this.router.navigate(["/"]);
        })
        .catch(error=>{
          this.flashMessages.show(error.message, {
            cssClass: 'alert-danger', timeout:4000
          });
        });
    }

}
