import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { IRegistro } from '../../auth/auth.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  authService = inject(AuthService);
  router = inject(Router);

  formularioRegistro = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    edad: new FormControl('', [Validators.required, Validators.min(6), Validators.max(100)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(7)]),
    repetirPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      this.validarPassword,
    ]),
    admin: new FormControl(false),
  });

  validarPassword(control: AbstractControl): ValidationErrors | null {
    if (!control.parent) return null;
    const contrasenia = control.parent?.get('password')?.value;
    const repetir = control.value;
    return contrasenia === repetir ? null : { validarPassword: true };
  }

  constructor() {
    // Forzamos la revalidación del campo repetirContrasenia si cambia contrasenia
    this.formularioRegistro.get('password')?.valueChanges.subscribe(() => {
      this.formularioRegistro.get('repetirPassword')?.updateValueAndValidity();
    });
  }

  get nombre() {
    return this.formularioRegistro.get('nombre');
  }
  get apellido() {
    return this.formularioRegistro.get('apellido');
  }
  get email() {
    return this.formularioRegistro.get('email');
  }
  get edad() {
    return this.formularioRegistro.get('edad');
  }
  get password() {
    return this.formularioRegistro.get('password');
  }
  get repetirPassword() {
    return this.formularioRegistro.get('repetirPassword');
  }

  async crearCuenta() {
    if (this.formularioRegistro.valid) {
      const { repetirPassword, edad, ...datosFiltrados } = this.formularioRegistro.value;
      const datos = { ...datosFiltrados, edad: Number(edad) } as IRegistro;
      const registro = await this.authService.registrar(datos);
      if (registro){
        this.router.navigate(['/home'])}
      };
    }
}

