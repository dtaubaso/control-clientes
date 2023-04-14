import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }
  @ViewChild("clienteForm") clienteForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  constructor(private clientesServicio: ClienteServicio,
    private flasMessages: FlashMessagesService
    ){}
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

  agregar({value, valid}:NgForm){
    if(!valid){
      this.flasMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else{
      // Agregar el nuevo cliente
      this.clientesServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }
private cerrarModal(){
  this.botonCerrar.nativeElement.click();
}
}
