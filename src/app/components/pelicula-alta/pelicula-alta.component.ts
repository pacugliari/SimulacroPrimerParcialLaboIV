import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actor } from 'src/app/model/actor';
import { FirestoreService } from 'src/app/services/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pelicula-alta',
  templateUrl: './pelicula-alta.component.html',
  styleUrls: ['./pelicula-alta.component.css']
})
export class PeliculaAltaComponent {

  actoresCargados : Array<Actor> = [];
  habilitarErrorActor : boolean = false;
  selectedFile: File | null = null;
  formActor = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    fechaEstreno: ['', [Validators.required]],
    cantidadPublico: ['',[Validators.required]],
    fotoPelicula: ['', [Validators.required]],
  });


  constructor(private formBuilder:FormBuilder,private firestore:FirestoreService,private router:Router){

  }

  async registrarActor(){
    //console.log(this.formActor)
    if( this.formActor.invalid || this.actoresCargados.length === 0 ){
      this.habilitarErrorActor = true;
    }else{
      if (this.selectedFile) {
        //const filePath = `/uploads/${this.selectedFile.name}`;
        if(await this.firestore.agregarPelicula(this.formActor.value,this.selectedFile,this.actoresCargados)){
          Swal.fire('Pelicula agregada', '', 'success')
          this.router.navigateByUrl('/refresh', {skipLocationChange: true}).then(()=> this.router.navigate(["peliculas/alta"]));
        }else{
          Swal.fire('ERROR', 'No se pudo agregar la pelicula', 'error')
        }
        
      }else{
        alert("Debe subir una foto valida")
      }
  
    }
    //console.log(this.selectedFile)
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  cargarActor(actor:any){
    let existe = false;
    this.habilitarErrorActor = false;
    this.actoresCargados.forEach(element => {
      if(element.nombre === actor.nombre){
        existe = true;
        return;

      }  
    });

    if(!existe)
      this.actoresCargados.push(actor);
  }
}
