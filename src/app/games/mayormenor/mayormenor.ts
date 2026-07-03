import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Toast } from '../../classes/toast';
import { Estadisticasjuegos } from '../../services/estadisticasjuegos';

@Component({
  selector: 'app-mayormenor',
  imports: [],
  templateUrl: './mayormenor.html',
  styleUrl: './mayormenor.css',
})

export class Mayormenor {
  puntajeService = inject(Estadisticasjuegos);

  intentosPermitidos: number;
  numeroInicial: number;
  numeroSecreto: number;
  numeroMaximo: number;
  puntaje: number;
  cartaOculta: WritableSignal<string>;
  cartaDescubierta: WritableSignal<string>;
  cartaInicial: WritableSignal<string>;

  constructor() {
    this.puntaje = 0;
    this.numeroMaximo = 12;
    this.intentosPermitidos = 3;
    this.numeroInicial = this.generarNumeroAleatorio();
    this.numeroSecreto = this.generarNumeroAleatorio();
    this.cartaInicial = signal(`assets/mayormenor/${this.numeroInicial}.png`);
    this.cartaOculta = signal('assets/mayormenor/cartaOculta.png');
    this.cartaDescubierta = signal(`assets/mayormenor/${this.numeroSecreto}.png`);

    //Para probar la carta
    console.log('Numero Secreto -> ' + this.numeroSecreto);
  }

  generarNumeroAleatorio(): number {
    const numeroAletorio = Math.floor(Math.random() * this.numeroMaximo) + 1;
    return numeroAletorio;
  }

  reasignarCarta() {
    this.numeroInicial = this.numeroSecreto;
    this.cartaInicial.set(`assets/mayormenor/${this.numeroInicial}.png`);
  }

  descontarVidas() {
    this.intentosPermitidos--;
  }

  sumarPuntaje() {
    this.puntaje += 100;
  }

  mostrarResultado() {
    this.cartaOculta.set(this.cartaDescubierta());
    setTimeout(() => {

      if(this.intentosPermitidos == 0){
        return;
      }

      this.reasignarCarta();

      this.numeroSecreto = this.generarNumeroAleatorio();
      console.log(this.numeroSecreto);

      this.cartaDescubierta.set(`assets/mayormenor/${this.numeroSecreto}.png`);

      this.cartaOculta.set('assets/mayormenor/cartaOculta.png');
    }, 2000);
  }

  compararCartas(tipoComparacion: number) {
        let resultadoCorrecto = false;

    switch (tipoComparacion) {
      //El secreto es menor
      case 1:
        resultadoCorrecto = this.numeroSecreto < this.numeroInicial;
        break;

      //igual
      case 2:
        resultadoCorrecto = this.numeroSecreto == this.numeroInicial;
        break;

      //mayor
      case 3:
        resultadoCorrecto = this.numeroSecreto > this.numeroInicial;
        break;
    }

    if (resultadoCorrecto) {
      this.sumarPuntaje();
    } else {
      this.descontarVidas();
    }

    this.mostrarResultado();

    if (this.intentosPermitidos <= 0 ) {
      Toast.fire({
        icon: 'error',
        title: 'Finalizo El Juego',
        text: 'Te quedaste sin intentos',
      });

      //ACA TENGO QUE LLAMAR A GUARDAR EL PUNTAJE.
      this.guardarPuntaje(this.puntaje)
      console.log('Puntaje de juego',this.puntaje);

      /*this.cartaInicial.set('assets/mayormenor/cartaOculta.png');
      this.cartaOculta.set('assets/mayormenor/cartaOculta.png');
      this.puntaje = 0;
      this.intentosPermitidos = 0;*/
    }
  }

  reiniciar(){
    this.puntaje = 0;
    this.numeroMaximo = 12;
    this.intentosPermitidos = 3;
    this.numeroInicial = this.generarNumeroAleatorio();
    this.numeroSecreto = this.generarNumeroAleatorio();
    this.cartaInicial = signal(`assets/mayormenor/${this.numeroInicial}.png`);
    this.cartaOculta = signal('assets/mayormenor/cartaOculta.png');
    this.cartaDescubierta = signal(`assets/mayormenor/${this.numeroSecreto}.png`);
  }

  //Tiene que llamar al servicio de Auth y guardarme el puntaje.
  async guardarPuntaje(puntaje: number, nombreJuego: string = 'mayormenor'){
      await this.puntajeService.guardarResultado(puntaje, nombreJuego)

  }}