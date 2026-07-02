import { Component } from '@angular/core';

@Component({
  selector: 'app-sudoku',
  imports: [],
  templateUrl: './sudoku.html',
  styleUrl: './sudoku.css',
})
export class Sudoku {

  arraySudoku = ['9--8-7-7',
                  '2-5--4',
                  'etc'
  ]

}


/**
 * Tengo el array aca: 
 * sudoku : [9--8--7]
 * 
 * 
 * HTML: @for cada elemento de mi array --> tengo 2 chances: 
 * Tomo los numeros de tipo number y tengo todos los elementos separados 1 por 1, si tengo "-" tomo como string y genero el input vacio para estos y el input completo para los otros.  
 * 
 * Boton de "enviar solucion" para comparar arrays. 
 * Timer que va creciendo. Mayor timer menor puntaje.
 * Boton para seguir jugando y traer otro sudoku de la api.
 * 
 * 
 */
