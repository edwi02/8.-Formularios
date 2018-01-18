import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma:FormGroup;

  usuario:Object = {

    nombreCompleto: {
      nombre: "Edwin",
      apellido: "Quintero"
    },
    correo: "edwin@gmail.com",
    pasatiempos:["Corre", "Ver Pelis", "Jugar"]

  }

  constructor() {

    console.log(this.usuario);

    //Cargar los datos del Usuario en el formulario (Opcion 1).
    //Nota: Esta opción requiere que sea tusuario:any
    // this.forma = new FormGroup({
    //
    //   'nombreCompleto': new FormGroup({
    //     'nombre': new FormControl( this.usuario.nombreCompleto.nombre,
    //                                  [
    //                                     Validators.required,
    //                                     Validators.minLength(3)
    //                                   ] ),
    //     'apellido': new FormControl(this.usuario.nombreCompleto.apellido, Validators.required)
    //   }),
    //   'correo': new FormControl(this.usuario.correo,
    //                                [
    //                                   Validators.required,
    //                                   Validators.pattern('^[a-zA-Z]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
    //                                 ])
    // });

    this.forma = new FormGroup({

      'nombreCompleto': new FormGroup({
        'nombre': new FormControl( '',
                                     [
                                        Validators.required,
                                        Validators.minLength(3)
                                      ] ),
        'apellido': new FormControl('',
                                        Validators.required)
      }),
      'correo': new FormControl('',
                                   [
                                      Validators.required,
                                      Validators.pattern('^[a-zA-Z]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
                                    ]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required )
      ])
    });

    //Cargar los datos del objeto en el formulario 8Opción 2)
    //this.forma.setValue( this.usuario );
  }

  agregarPasatiempo(){
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required )
    )
  }

  guardarCambios(){
    console.log( this.forma.value );
    console.log( this.forma );

    //Opción 1 para restablecer valores
    //this.forma.reset( this.usuario );

    //opción 2
    this.forma.reset({
      nombreCompleto:{
        nombre:"",
        apellido:""
      },
      correo:""
    });

    //Opción 3
    //this.forma.controls['correo'].reset();


  }

}
