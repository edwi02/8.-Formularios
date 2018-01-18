import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
      .ng-invalid.ng-touched:not(form) {
          border:1px solid red;

      }
  `]
})
export class TemplateComponent {

  usuario:Object = {
    nombre: null,
    apellido: null,
    correo: null,
    /*pais: "CO"*/
    pais: "",
    sexo: "Hombre",
    acepta: true
  }

  sexos:string[] = ["Hombre", "Mujer"];

  paises:Object = [
    {
      codigo: "CO",
      nombre: "Colombia"
    },
    {
      codigo: "ES",
      nombre: "España"
    },
    {
      codigo: "AR",
      nombre: "Argentina"
    }
  ];

  constructor() { }

  guardar( forma:NgForm ){
    console.log("Formulario posteados")
    console.log( "NgForm", forma );
    console.log( "Value: ", forma.value );
    console.log( "Usuario", this.usuario);
  }

}
