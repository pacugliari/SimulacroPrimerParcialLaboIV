import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Actor } from 'src/app/model/actor';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-tabla-actor',
  templateUrl: './tabla-actor.component.html',
  styleUrls: ['./tabla-actor.component.css']
})
export class TablaActorComponent {
  actores : Array<Actor> = [];
  @Input()  mostrarDatosCompletos : boolean = false;
  @Input()  mostrarSeleccionar : boolean = false;
  @Input()  datos ?: Array<Actor>;
  @Output() eventActorSeleccionado = new EventEmitter<Actor>();
  
  constructor(private firestoreService:FirestoreService){
  }

  ngOnInit(){
    console.log(this.datos)
    if(typeof this.datos === 'undefined'){
      this.firestoreService.getActores()
      .then((respuesta)=> {
        //console.log(respuesta)
        this.actores = respuesta;
      });
    }else{
      this.actores = this.datos;
    }
  }

  seleccionar(actor : Actor){
    this.eventActorSeleccionado.emit(actor);
  }
}
