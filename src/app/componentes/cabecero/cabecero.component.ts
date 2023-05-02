import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit{

  isLoggedIn: boolean;
  loggedInUser: string;
  permitirRegistro: boolean;

  constructor(
    private loginservice: LoginService,
    private router: Router,
    private configuracionServicio: ConfiguracionServicio
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
      });

      this.configuracionServicio.getConfiguracion().subscribe( configuracion =>{
        this.permitirRegistro = configuracion.permitirRegistro;
      });
  }

  logout(){
    this.loginservice.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
