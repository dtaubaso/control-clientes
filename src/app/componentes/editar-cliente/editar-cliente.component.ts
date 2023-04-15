import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent {

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  id:string;

  constructor(private clientesServicio: ClienteServicio,
    private flasMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
    ){}

    ngOnInit(){
      this.id = this.route.snapshot.params['id'];
      this.clientesServicio.getCliente(this.id).subscribe(cliente=> {
        this.cliente = cliente;
      });
    }

    guardar({value, valid}:NgForm){
      if(!valid){
        this.flasMessages.show('Por favor llena el formulario correctamente', {
          cssClass: 'alert-danger', timeout: 4000
        });
      
    }else{
      // Guardar cliente
      value.id = this.id;
      // modificar cliente
      this.clientesServicio.modificarCliente(value);
      this.router.navigate(['/'])
    }
}

eliminar(){
  if(confirm('Seguro que desea eliminar el cliente?')){
    this.clientesServicio.eliminarCliente(this.cliente);
    this.router.navigate(["/"]);
  }
}

}
