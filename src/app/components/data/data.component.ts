import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    correo: "edwin@gmailc.com"

  }

  constructor() {

    console.log(this.usuario);

    this.forma = new FormGroup({

      'nombreCompleto': new FormGroup({
        'nombre': new FormControl( '',
                                     [
                                        Validators.required,
                                        Validators.minLength(3)
                                      ] ),
        'apellido': new FormControl('', Validators.required)
      }),
      'correo': new FormControl('', [
                                      Validators.required,
                                      Validators.pattern('^[a-zA-Z]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
                                    ])
    });
  }

  guardarCambios(){
    console.log( this.forma.value );
    console.log( this.forma );
  }

}
