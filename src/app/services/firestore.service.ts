import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, getFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:Firestore) { }

  async getActores() {
    const querySnapshot = await getDocs(collection(this.firestore, "actores"));
    querySnapshot.forEach((doc) => {
      let actores = doc.data();
      console.log(actores);
    });
  }

  agregarActor(actor:any){
    const actoresRef = collection(this.firestore,'actores');
    return addDoc(actoresRef,actor);
  }
}
