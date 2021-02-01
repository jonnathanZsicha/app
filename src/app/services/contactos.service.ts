import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Mensaje } from '../model/mensaje';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {
  constructor(public afs: AngularFirestore) { }

  saveContacto(contacto: Mensaje){
    const refContacto = this.afs.collection("contactos");
    if(contacto.uid==null){
      contacto.uid = this.afs.createId();
      contacto.deleted = false;
    }
      

    refContacto.doc(contacto.uid).set(Object.assign({}, contacto), { merge: true})
  }

  getContactos(): Observable<any[]>{
    return this.afs.collection("contactos",
            ref => ref.where("deleted", "==", false)).valueChanges();
  }



  getContactoById2(uid: string) :Observable<any>{
    return this.afs.collection("contactos", 
            ref => ref.where('uid', '==', uid))
                      .valueChanges();
  }

  borrarContacto(uid: string){
    const refContacto = this.afs.collection("contactos");
    
    const aux = {deleted: true};
    refContacto.doc(uid).set( {...aux}, { merge: true})
  }

}
