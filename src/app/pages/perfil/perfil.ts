import { Component, inject, OnInit } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  
  perfilGitHub = inject(Api);
  sudoku = "Un Sudoku es un juego de lógica y razonamiento en el que el objetivo es completar una cuadrícula de 9×9 con números del 1 al 9. Cada número debe aparecer una sola vez en cada fila, cada columna y cada subcuadrícula de 3×3. No requiere cálculos matemáticos, sino análisis y deducción para encontrar la posición correcta de cada número."

  ngOnInit(): void {
    this.perfilGitHub.getUser();
    console.log(this.perfilGitHub)
  }

}
