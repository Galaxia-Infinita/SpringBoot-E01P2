import { Component, OnInit } from '@angular/core';
import { Empleado } from '../empleado';
import { EmpleadoService } from '../empleado.service';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  empleados:Empleado[];

  constructor(private empleadoServicio:EmpleadoService, private router:Router) { }

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  actualizarEmpleado(id:number){
    this.router.navigate(['actualizar-empleado',id]);
  }

  private obtenerEmpleados(){
    this.empleadoServicio.obtenerListaDeEmpleados().subscribe(dato =>{
      this.empleados= dato;
    });
  }

  verDetallesEmpleado(id:number){
    this.router.navigate(['empleado-detalles',id]);
  }

  eliminarEmpleado(id:number){
    swal({
      title: '¿Estas Seguro?',
      text: " Confirma si deseas eliminar empleado",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#3086d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Si, eliminalo',
      cancelButtonText:'No, cancelar',
      confirmButtonClass:'btn btn-danger',
      cancelButtonClass:'btn btn-danger',
      buttonsStyling:true
    }).then((result)=>{
      if(result.value){
        this.empleadoServicio.eliminarEmpleado(id).subscribe(dato =>{
          console.log(dato);
          this.obtenerEmpleados();
          swal(
            'Empleado eliminado',
            'El empleado ha sido eliminado exitosamente',
            'success'
          )
        })
      }
    })
  }
}
