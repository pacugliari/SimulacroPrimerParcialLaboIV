import { Component } from '@angular/core';
import { Pelicula } from 'src/app/model/pelicula';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-pelicula-listado',
  templateUrl: './pelicula-listado.component.html',
  styleUrls: ['./pelicula-listado.component.css']
})
export class PeliculaListadoComponent {

  peliculas : Array<Pelicula> = [];

  constructor(private firestore:FirestoreService){
    /*let jsonPeliculas = localStorage.getItem("peliculas");
    if(jsonPeliculas)
      this.peliculas = JSON.parse(jsonPeliculas);*/
    this.firestore.getPeliculas().then((respuesta)=>{
      this.peliculas = respuesta;
    })
  }
}
