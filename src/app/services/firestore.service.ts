import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs,doc,deleteDoc } from '@angular/fire/firestore'
import { Actor } from '../model/actor';
import {  ref , uploadBytes , getDownloadURL,deleteObject} from 'firebase/storage';
import { storage } from 'src/main';
import { Pelicula } from '../model/pelicula';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  actores : Array<Actor> = [];
  peliculas : Array<Pelicula> = [];

  constructor(private firestore:Firestore) { }

  async getActores() {
    const querySnapshot = await getDocs(collection(this.firestore, "actores"));
    this.actores = [];
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
    this.peliculas = [];
    const querySnapshot = await getDocs(collection(this.firestore, "peliculas"));
    querySnapshot.forEach((doc) => {
      let pelicula = doc.data() as Pelicula;
      pelicula.id = doc.id;
      this.peliculas.push(pelicula)
    });
    return this.peliculas;
  }

  async borrarPelicula(pelicula:Pelicula){
    let retorno = false;

    const desertRef = ref(storage,pelicula.fotoPelicula);

    await deleteObject(desertRef)
      .then(async(respuesta) => {
        const usuarioRef = collection(this.firestore,'peliculas');
        console.log(pelicula.id)
        const documento = doc(usuarioRef,pelicula.id)
        await deleteDoc(documento)
          .then((respuesta)=>{
            retorno = true;
          })
          .catch((error) => {
          });
      })
      .catch((error) => {
      });

    return retorno;
  }

  async agregarPelicula (pelicula:any,foto: File,actores : Array<Actor>){//pReferencia: StorageReference
    let hora = new Date().getTime();//obtengo hora actual
    let ubicacion = "/" + pelicula.nombre + hora;//le digo la ubicacion de la foto en el firebaseStorage
    const imgRef = ref(storage,ubicacion)
    let retorno = false;
    await uploadBytes(imgRef,foto).then(async()=>{
        const url = await getDownloadURL(imgRef)
        .then(async(resultado) => {
          let data = { 
            nombre: pelicula.nombre,
            tipo: pelicula.tipo,
            fechaEstreno: pelicula.fechaEstreno,
            cantidadPublico: pelicula.cantidadPublico,
            fotoPelicula: resultado,
            actores : actores
          }
          const usuarioRef = collection(this.firestore,'peliculas');
          await addDoc(usuarioRef,data)
            .then((resultado)=>{
              retorno = true;
            })
            .catch((error)=>{
              console.log(error);
            }) 
      })
      .catch((error)=>{

      });
    })
    return retorno;
  }
}
