import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit{

  isLoggedIn: boolean;
  loggedInUser: string;

  constructor(
    private loginservice: LoginService,
    private router: Router
  ){}

  ngOnInit() {
      this.loginservice.getAuth().subscribe( auth => {
        if(auth){
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
        }
        else{
          this.isLoggedIn = false;
        }
      })
  }

  logout(){
    this.loginservice.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
