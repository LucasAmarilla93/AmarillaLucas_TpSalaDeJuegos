import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { ChatService } from './services/chat.service';
import { Chat } from "./components/chat/chat";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Chat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tpSalaDeJuegos');
  protected authService = inject(AuthService)
  protected chatService = inject(ChatService)


  traerMensajes(){
    this.chatService.traerMensajes();
  }


  cerrarSesion(){
    this.authService.cerrarSesion()
  }
}
