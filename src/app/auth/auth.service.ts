import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthResponse,
  createClient,
  RealtimeChannel,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { ILogin, IRegistro } from './auth.interfaces';
import { email } from '@angular/forms/signals';
import { Toast } from '../classes/toast';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router);

  publicKey: string = 'sb_publishable_6kR6i9OgdEtMisBDz7ZGRg_ei79t3Cn';
  urlSupabase: string = 'https://weybxnutahapdhfyyzfv.supabase.co';
  supabase: SupabaseClient<any, 'public', 'public', any, any>;
  usuarioActual: WritableSignal<User | null> = signal<User | null>(null);
  canal: RealtimeChannel;

  constructor() {
    this.supabase = createClient(this.urlSupabase, this.publicKey);
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.usuarioActual.set(session != null ? session.user : null);
    });

    //Canal de RealTime
    this.canal = this.supabase.channel('table-db-changes');
  }

  async registrar(datos: IRegistro): Promise<boolean> {
    const response: AuthResponse = await this.supabase.auth.signUp({
      email: datos.email,
      password: datos.password,
      options: {
        data: {
          nombre: datos.nombre,
          apellido: datos.apellido,
          edad: datos.edad,
          admin: datos.admin,
        },
      },
    });
    console.log(response);
    if (response.error) {
      console.log(response.error);
      switch (response.error.name) {
        case 'AuthWeakPasswordError':
        case 'weak_password':
          Toast.fire({
            icon: 'error',
            title: 'Error',
            text: 'El password no cumple con los requisitos',
          });
          break;

        case 'AuthApiError':
        case 'user_already_exists':
          Toast.fire({
            icon: 'error',
            title: 'Error',
            text: 'El usuario ya existe',
          });
          break;
        case 'invalid_email':
          Toast.fire({
            icon: 'error',
            title: 'Error',
            text: 'Email Invalido',
          });
          break;

        default:
          Toast.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error desconocido',
          });
      }
      return false;
    } else {
      Toast.fire({
        icon: 'success',
        title: 'Usuario Creado Exitosamente',
        text: 'Proceso Finalizado',
      });
      return true;
    }
  }

  async loguear(datos: ILogin): Promise<boolean> {
    const response: AuthResponse = await this.supabase.auth.signInWithPassword({
      email: datos.email,
      password: datos.password,
    });
    if (response.error) {
      switch (response.error.message) {
        case 'Invalid login credentials':
          Toast.fire({
            icon: 'error',
            text: 'Error en las credenciales',
            title: 'Error',
          });
          break;

        case 'Email not confirmed':
          Toast.fire({
            icon: 'error',
            text: 'Error en las credenciales',
            title: 'Error',
          });
          break;

        case 'Password should be at least 8 character':
          Toast.fire({
            icon: 'error',
            text: 'El password no cumple con los requisitos',
            title: 'Error',
          });
          break;

        case 'Invalid email or password':
          Toast.fire({
            icon: 'error',
            text: 'Email o password invalido',
            title: 'Error',
          });
          break;

        case 'User not found':
          Toast.fire({
            icon: 'error',
            text: 'Error en las credenciales',
            title: 'Error',
          });
          break;

        default:
          Toast.fire({
            icon: 'error',
            text: response.error.message,
            title: 'Error',
          });
      }
      return false;
    } else {
      Toast.fire({
        icon: 'success',
        title: 'Conectado Exitosamente',
        text: 'Coneccion Exitosa',
      });
      return true;
    }
  }

  async cerrarSesion() {
    await this.supabase?.auth.signOut({});
    this.usuarioActual.set(null);
    this.router.navigateByUrl('/home');
  }

  async obtenerUsuarioActual(): Promise<User | null> {
    const usuario = this.usuarioActual();
    if (usuario) return usuario;

    const { data } = await this.supabase.auth.getUser();
    if (data?.user) {
      this.usuarioActual.set(data.user);
      return data.user;
    }
    return null;
  }

  //Darle implementacion luego.
  async verificarRol() {}

  get nombreUsuario(): string | undefined {
    return this.usuarioActual()?.user_metadata?.['nombre'];
  }
  
}
