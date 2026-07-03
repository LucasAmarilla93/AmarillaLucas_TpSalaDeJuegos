import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PostgrestQueryBuilder } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class Estadisticasjuegos {
  supabService = inject(AuthService);
  tablaResultados: PostgrestQueryBuilder<any, any, any, 'resultados', unknown> =
    this.supabService.supabase.from('resultados');
  usuario = this.supabService.nombreUsuario;

  //Va un order aca de mejor desempeño al peor.
  async traerResultados() {
    const { data, error } = await this.supabService.supabase.from('resultados').select('*');
  }

  //Yo no los tengo creados, entonces tengo que guardarlo primero y despues actualizarlo en todo caso.

  async guardarResultado(puntaje: number, juego: string) {
    //Esto solo guarda el resultado, no lo suma si tenia anterior.
    //upsert hace el update y si no existe el insert.
    const { data, error } = await this.supabService.supabase
      .from('resultados')
      .select('*')
      .eq('usuario', this.usuario);
    
      console.log('Error:', error)
    let puntajePrevio = 0;

    if(data && data[0][juego] != null){
      puntajePrevio = data[0][juego];
    }
    await this.supabService.supabase.from('resultados').upsert({
      usuario: this.usuario,
      [juego]: puntaje + puntajePrevio,
    });
  }
}
