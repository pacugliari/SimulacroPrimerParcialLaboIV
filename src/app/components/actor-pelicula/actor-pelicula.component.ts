import { Component } from '@angular/core';
import { Actor } from 'src/app/model/actor';
import { Pais } from 'src/app/model/paises';
import { Pelicula } from 'src/app/model/pelicula';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-actor-pelicula',
  templateUrl: './actor-pelicula.component.html',
  styleUrls: ['./actor-pelicula.component.css']
})
export class ActorPeliculaComponent {
  actorSeleccionado ?:Actor;
  peliculasActor : Pelicula[]=[];
  paisActor : Pais[] = []; 

  constructor(private firestore:FirestoreService,private paisesService:PaisesService){
  }

  contieneActor(actores : Actor[]){
    let retorno = false;
    actores.forEach(element => {
      if(element.nombre === this.actorSeleccionado?.nombre && element.apellido === this.actorSeleccionado?.apellido){
        retorno = true;
      }
    });
    return retorno;
  }

   async mostrar(event:any){
    this.actorSeleccionado = event;
    
    this.firestore.getPeliculas()
    .then((respuesta)=>{
      this.peliculasActor = respuesta.filter((element)=> this.contieneActor(element.actores))
    })


    this.paisActor = (await this.paisesService.TraerPaises()).filter((respuesta)=> respuesta.nombre === this.actorSeleccionado?.pais);

  }
}
