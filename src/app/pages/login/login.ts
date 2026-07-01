import { Component, inject } from '@angular/core';
import { Credenciales } from './login.interfaces';
import { Auth } from '../../auth/auth';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { email } from '@angular/forms/signals';
import { ILogin, IRegistro } from '../../auth/auth.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {

  protected accesoUno: Credenciales = {
    email: 'accesouno@gmail.com',
    password: 'Acceso1234'
  }

  protected accesoDos: Credenciales = {
    email: 'accesodos@gmail.com',
    password: 'Acceso1234'
  }

  protected accesoTres: Credenciales = {
    email: 'accesotres@gmail.com',
    password: 'Acceso1234'
  }

  auth = inject(AuthService);
  router = inject(Router)

  formularioLogin = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)])
  })

  get email(){
    return this.formularioLogin.get("email");
  }
  
  get password(){
    return this.formularioLogin.get("password");
  }

  iniciarSesion(){
    if(this.formularioLogin.valid){
      this.auth.loguear(this.formularioLogin.value as ILogin).then(()=> {this.router.navigate(['/home'])})
    }
  }

  iniciarRapido(acceso: Credenciales){
    this.formularioLogin.setValue({
      email: acceso.email, password: acceso.password
    });
    this.iniciarSesion();
  }
}

