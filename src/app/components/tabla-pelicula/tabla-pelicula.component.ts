import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pelicula } from 'src/app/model/pelicula';

@Component({
  selector: 'app-tabla-pelicula',
  templateUrl: './tabla-pelicula.component.html',
  styleUrls: ['./tabla-pelicula.component.css']
})
export class TablaPeliculaComponent {
  @Input() peliculas ?: Array<Pelicula>;
  @Input() mostrarSeleccionar : boolean = true;
  @Output() event = new EventEmitter<Pelicula>();

  seleccionar(pelicula : Pelicula){
    this.event.emit(pelicula);
  }
}
