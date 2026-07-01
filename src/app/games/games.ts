import { Component } from '@angular/core';
import {TCard } from '../components/card/card.type';
import { Card } from "../components/card/card";

@Component({
  selector: 'app-games',
  imports: [Card],
  templateUrl: './games.html',
  styleUrl: './games.css',
})
export class Games {
  juegos: TCard[] = [
    {
      titulo: 'Ahorcado',
      desc: '',
      imagen: 'assets/ahorcado/ahorcado.jpg',
      ruta: 'ahorcado',
    },
    {
      titulo: 'Sudoku',
      desc: '',
      imagen: 'assets/sudoku/sudoku.jpg',
      ruta: 'sudoku',
    },
    {
      titulo: 'Preguntados',
      desc: 'Juegos de preguntas',
      imagen: 'assets/preguntados/preguntados.png',
      ruta: 'preguntados',
    },
    {
      titulo: 'Mayor o Menor',
      desc: '',
      imagen: 'assets/mayormenor/naipes.jpg',
      ruta: 'mayormenor',
    },
  ]
}
