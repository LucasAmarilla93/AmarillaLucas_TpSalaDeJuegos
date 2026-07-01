import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class Api {
  httpC = inject(HttpClient)
  usuarioGitHub = signal <any | null> (null);

  usuario = 'LucasAmarilla93';
  apiGitHub = 'https://api.github.com/users/';

  getUser(){
    const peticion = this.httpC.get<any>(this.apiGitHub + this.usuario);

    const suscripcion = peticion.subscribe((data) => {
      if(data){
        this.usuarioGitHub.set(data)
      }
      suscripcion.unsubscribe();
    })
  }
}
