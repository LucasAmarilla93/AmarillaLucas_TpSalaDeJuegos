import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AbstractControl, FormControl, FormControlName, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'app-encuesta',
  imports: [ReactiveFormsModule],
  templateUrl: './encuesta.html',
  styleUrl: './encuesta.css',
})
export class Encuesta {
  authService = inject(AuthService);

  formularioencuesta = new FormGroup({
    nombre: new FormControl("",[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    apellido: new FormControl("",[Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    edad: new FormControl("",[Validators.required,Validators.min(18), Validators.max(99)]),
    telefono: new FormControl("",[Validators.required, Validators.maxLength(10)]),
    preguntaUno: new FormControl("", [Validators.required, Validators.maxLength(100)]),
    preguntaDos: new FormControl("", [Validators.required, Validators.maxLength(100)]),
    preguntaTres: new FormControl("", [Validators.required, Validators.maxLength(100)])
  })

  validarNumero(control: AbstractControl) : ValidationErrors | null {
    const numero = control.value
    if(!numero) return null;
    
    /*if(typeof Number(numero) === "number"){ return null} else{ 
      return {validarNumero: true}
    }*/
    return isNaN(Number(numero))  ?  {validarNumero: true} : null
  }


  //GuardarRespuesta en DB identificando al usuario.
  guardarRespuesta(){

  }

}
