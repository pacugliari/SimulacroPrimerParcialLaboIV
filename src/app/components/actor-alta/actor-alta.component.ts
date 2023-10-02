import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Pais } from 'src/app/model/paises';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-actor-alta',
  templateUrl: './actor-alta.component.html',
  styleUrls: ['./actor-alta.component.css']
})
export class ActorAltaComponent {

  pais :Pais = new Pais();

  formActor = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    nombreUsuario: ['', [Validators.required]],
    correo: ['',],
    direccionUno: ['', [Validators.required]],
    direccionDos: ['',],
    pais: ['', [Validators.required]],
    capital: ['', [Validators.required]],
  });

  constructor(private formBuilder:FormBuilder,private firestoreService : FirestoreService ){

  }

  registrarActor(){
    //console.log(this.formActor.value);
    this.firestoreService.agregarActor(this.formActor.value)
      .then((respuesta)=>{
        alert("Actor guardado de manera exitosa")
      })
      .catch((error)=>{
        alert("Error al guardar el actor")
        console.log(error);
      })
  }

  consultarFire(){
    this.firestoreService.getActores();
  }


  cargarPais(pais:Pais){
    if(pais.nombre && pais.capital){
      this.formActor.get('pais')?.setValue(pais.nombre);
      this.formActor.get('capital')?.setValue(pais.capital);
    }
    
  }


}
