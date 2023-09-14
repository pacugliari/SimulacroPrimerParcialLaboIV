import { Component } from '@angular/core';
import { Pelicula } from 'src/app/model/pelicula';

@Component({
  selector: 'app-pelicula-listado',
  templateUrl: './pelicula-listado.component.html',
  styleUrls: ['./pelicula-listado.component.css']
})
export class PeliculaListadoComponent {

  peliculas : Array<Pelicula> = [];

  constructor(){
    let jsonPeliculas = localStorage.getItem("peliculas");
    if(jsonPeliculas)
      this.peliculas = JSON.parse(jsonPeliculas);
  }
}
