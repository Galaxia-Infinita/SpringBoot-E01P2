import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { Route, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-empleado',
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.css']
})
export class RegistrarEmpleadoComponent implements OnInit {

  empleado: Empleado= new Empleado();

  constructor(private empleadoServicio:EmpleadoService, private router:Router ) { }

  ngOnInit(): void {}
  
  guardarEmpleado(){
    this.empleadoServicio.registrarEmpleado(this.empleado).subscribe(dato => {
      console.log(dato);
      this.redireccionListaEmpleados();

    },error =>console.log(error));
  }

  redireccionListaEmpleados(){
    this.router.navigate(['/empleados']);
    swal('Empleado registrado',`El empleado ${this.empleado.nombre} ha sido registrado con exito`,`success`);
  }

  onSubmit(){
    this.guardarEmpleado();
  }
}
