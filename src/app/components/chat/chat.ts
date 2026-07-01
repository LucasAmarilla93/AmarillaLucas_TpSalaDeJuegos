import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { IMensaje } from './mensaje.interface';
import { single } from 'rxjs';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})

export class Chat implements OnInit{
  chatAbierto = false;
  chatService = inject(ChatService)
  mensajes: WritableSignal<IMensaje[]> = signal([]);
  contenido: string = "";
  
 //Crear canal que escucha eventos.

  async ngOnInit(): Promise<void> {
    const data =(await this.chatService.traerMensajesPrevios()) as IMensaje[];
    this.mensajes.set(data);
  }

  enviar(){
    this.chatService.enviarMensaje(this.contenido)
  }
  
}

