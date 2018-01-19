import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

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
                                        [
                                          Validators.required,
                                          this.noHerrera
                                        ])
      }),
      'correo': new FormControl('',
                                   [
                                      Validators.required,
                                      Validators.pattern('^[a-zA-Z]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
                                    ]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required )
      ]),
      'userName':new FormControl('', Validators.required, this.existeUsuario ),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    });

    //Cargar los datos del objeto en el formulario 8Opción 2)
    //this.forma.setValue( this.usuario );

    //Otra forma de establecer validaciones
    this.forma.controls['password2'].setValidators([
    Validators.required,
    this.noIgual.bind( this.forma ) // Por un comportamiento de JavaScript
                                    // se debe ejecutar como Bind. Esto lo
                                    // que hace es indicar que "this.forma" que
                                    // está en otro contexto, ahora es igual a
                                    //"this "" Eso indica que al nencesitarlo en
                                    // la función se coloca "this"
  ])
  }

  agregarPasatiempo(){
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required )
    )
  }

  noHerrera( control: FormControl ): { [s:string]:boolean} {

    if( control.value === "herrera"){
      return {
        noherrera:true
      }
    }

    return null;

  }

  noIgual( control: FormControl ): { [s:string]:boolean} {

    //console.log(this);
    let forma:any = this;

    // if( control.value !== this.forma.controls['password1'].value ){
    if( control.value !== forma.controls['password1'].value ){
      return {
        noiguales:true
      }
    }

    return null;

  }

  existeUsuario( control: FormControl ): Promise <any> | Observable<any>{

    let promesa = new Promise(
        ( resolve, reject ) =>{
          setTimeout( ()=>{
            if( control.value === "strider"){
              resolve ( {existe:true} )
            }else{
              resolve( null )
            }
          }, 3000)
        }
    )

    return promesa;

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
