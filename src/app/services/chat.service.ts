import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PostgrestQueryBuilder, RealtimeChannel } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  supabaseService = inject(AuthService);
  tablaMensajes: PostgrestQueryBuilder<any, any, any, 'mensajes', unknown> =
    this.supabaseService.supabase.from('mensajes');
  canal : RealtimeChannel = this.supabaseService.canal;

  get usuarioChat(): string | undefined {
    return this.supabaseService.usuarioActual()?.user_metadata?.['nombre'];
  }

  async traerMensajes() {
    const { data, error } = await this.supabaseService.supabase.from('mensajes').select('*');
  }

  async enviarMensaje(contenido: string) {
    const { data } = await this.tablaMensajes.insert({
      usuario: this.usuarioChat,
      contenido: contenido,
    });
    console.log(data)
  }

  async traerMensajesPrevios(){
    const {data} = await this.tablaMensajes.select('*').order('creado_en', {ascending: true});
    return data;
  }


}
