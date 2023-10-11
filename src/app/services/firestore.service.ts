import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, getFirestore } from '@angular/fire/firestore'
import { Actor } from '../model/actor';
import {  ref , uploadBytes , getDownloadURL, StorageReference, getStorage} from 'firebase/storage';
import { storage } from 'src/main';
import { Pelicula } from '../model/pelicula';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  actores : Array<Actor> = [];
  peliculas : Array<Pelicula> = [];

  constructor(private firestore:Firestore) { }

  async getActores() {
    const querySnapshot = await getDocs(collection(this.firestore, "actores"));
    querySnapshot.forEach((doc) => {
      let actor = doc.data() as Actor;
      this.actores.push(actor)
    });
    return this.actores;
  }

  agregarActor(actor:any){
    const actoresRef = collection(this.firestore,'actores');
    return addDoc(actoresRef,actor);
  }

  async getPeliculas() {
    const querySnapshot = await getDocs(collection(this.firestore, "peliculas"));
    querySnapshot.forEach((doc) => {
      let pelicula = doc.data() as Pelicula;
      pelicula.id = doc.id;
      this.peliculas.push(pelicula)
    });
    return this.peliculas;
  }

  agregarPelicula (pelicula:any,foto: File,actores : Array<Actor>){//pReferencia: StorageReference
    let hora = new Date().getTime();//obtengo hora actual
    let ubicacion = "/" + pelicula.nombre + hora;//le digo la ubicacion de la foto en el firebaseStorage
    const imgRef = ref(storage,ubicacion)
    
    uploadBytes(imgRef,foto).then(()=>{
        const url = getDownloadURL(imgRef)
        .then((resultado) => {
          let data = { 
            nombre: pelicula.nombre,
            tipo: pelicula.tipo,
            fechaEstreno: pelicula.fechaEstreno,
            cantidadPublico: pelicula.cantidadPublico,
            fotoPelicula: resultado,
            actores : actores
          }
          const usuarioRef = collection(this.firestore,'peliculas');
          addDoc(usuarioRef,data)
            .then((resultado)=>{
              alert("Pelicula agregada de manera exitosa")
            })
            .catch((error)=>{
              alert("Error al agregar pelicula,consultar consolelog")
              console.log(error);
            }) 
      });
    })

  }
}
