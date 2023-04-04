import { Component } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  clientes: Cliente[];

  constructor(private clientesServicio: ClienteServicio){}
  ngOnInit(){
    this.clientesServicio.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    )
  }

  getSaldoTotal(){
    let saldoTotal : number = 0;
    if(this.clientes){
      this.clientes.forEach(cliente => {
        // el ! para que no de error de undefined
        saldoTotal += cliente.saldo!;
      });
    }
    return saldoTotal;
  }

}
