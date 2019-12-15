import { Component, OnInit } from '@angular/core';
import { ProveedorDTO } from '../shared/objects/ProveedorDTO';
import { ProveedorService } from './../shared/services/proveedor.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  proveedorDTO: ProveedorDTO;

  proveedores: ProveedorDTO[];

  editar: Boolean;

  constructor(private proveedorService: ProveedorService) { }

  ngOnInit() {
    this.editar = false;
    this.proveedorDTO = new ProveedorDTO();
    this.proveedores = [];
    this.proveedorService.getProveedores().subscribe(result => {
      if (result.length > 0)
        this.proveedores = result;
    },
      error => {
        console.log(error);
      });

    /*let proveedorPrueba = new ProveedorDTO();
    proveedorPrueba.direccion = "Prueba";
    proveedorPrueba.telefono = "Prueba";
    proveedorPrueba.nombre = "Prueba";
    proveedorPrueba.id = 754092;
    proveedorPrueba.fecha_registro = new Date();

    this.proveedores.push(proveedorPrueba);*/
  }

  saveProveedor() {
    this.proveedorDTO.fecha_registro = new Date();
    if (this.validateData()) {
      if (this.editar) {
        this.proveedorService.saveProveedor(this.proveedorDTO).subscribe(result => {
          if (result) {
            this.proveedorDTO = new ProveedorDTO();
            this.editar = false;
            this.refreshData();
          }
        },
          error => {
            this.editar = false;
          });
      } else {
        this.proveedorService.updateProveedor(this.proveedorDTO).subscribe(result => {
          if (result) {
            this.proveedorDTO = new ProveedorDTO();
            this.editar = false;
            this.refreshData();
          }
        },
          error => {
            this.editar = false;
          });
      }
    }
    else
      console.log("Fallaron las validaciones");
  }

  refreshData() {
    this.proveedorService.getProveedores().subscribe(result => {
      console.log(result);
      if (result && result.length > 0)
        this.proveedores = result;
    },
      error => {
        console.log(error);
      });
  }

  validateData(): Boolean {
    if (this.proveedorDTO.direccion == "" && this.proveedorDTO.nombre == "" && this.proveedorDTO.telefono == "") {
      console.log("Información incompleta");
      return false;
    }

    if (this.proveedorDTO.nombre.length < 5) {
      console.log("Nombre menor que 5");
      return false;
    }

    if (this.proveedorDTO.telefono.length != 7) {
      console.log("Telefono diferente de 7");
      return false;
    }

    if (!this.proveedorDTO.direccion.startsWith("CL") &&
      !this.proveedorDTO.direccion.startsWith("cl") && !this.proveedorDTO.direccion.startsWith("Cl")
      && !this.proveedorDTO.direccion.startsWith("cL")) {
      console.log("No empieza con CL");
      return false;
    }

    if (new Date().getDay() == 0) {
      console.log("Es un domingo");
      return false;
    }

    if (this.palindrome(this.proveedorDTO.nombre)) {
      console.log("Es palindroma");
      return false;
    }

    if (!(/^\d+$/.test(this.proveedorDTO.telefono))) {
      console.log("Telefno no es numero");
      return false;
    }

    if (this.getVowels(this.proveedorDTO.direccion) != 3) {
      console.log("Direccion no tiene vocales");
      return false;
    }


    return true;
  }

  edit(proveedor: ProveedorDTO) {
    console.log(proveedor);
    this.proveedorDTO = proveedor;
    this.editar = true;
  }

  palindrome(data: string): Boolean {
    var re = /[\W_]/g;
    var lowRegStr = data.toLowerCase().replace(re, '');
    var reverseStr = lowRegStr.split('').reverse().join('');
    return reverseStr === lowRegStr;
  }

  getVowels(str): number {
    var m = str.match(/[aeiou]/gi);
    return m === null ? 0 : m.length;
  }

}
