import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { IMensaje } from './mensaje.interface';
import { single, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-chat',
  imports: [FormsModule,DatePipe],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})

export class Chat implements OnInit{
  
  chatAbierto = false;
  chatService = inject(ChatService)
  mensajes: WritableSignal<IMensaje[]> = signal([]);
  contenido: string = "";
  nombreUsuario = this.chatService.usuarioChat;
 //Crear canal que escucha eventos.

  async ngOnInit(): Promise<void> {
    const data =(await this.chatService.traerMensajesPrevios()) as IMensaje[];
    this.mensajes.set(data);
    
    this.chatService.canal.on('postgres_changes',{
      event: "INSERT",
      schema: "public",
      table: "mensajes"
    }, (data) => {
      console.log(data);
      const mensajesNew = [...this.mensajes()];
      mensajesNew.push(data.new as IMensaje);
      this.mensajes.set(mensajesNew);
    }
    
  ).subscribe()
  }

 /* ngOnDestroy(): void {
    this.chatService.canal.unsubscribe();
  }*/
  
  enviar(){
    this.chatService.enviarMensaje(this.contenido);
    this.contenido = '';
  }
  
}

