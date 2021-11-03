import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Medicos } from 'src/app/interfaces/medicos';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore/collection/collection';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  private medicosCollection: AngularFirestoreCollection<Medicos>;

  constructor(private afs: AngularFirestore) {
    this.medicosCollection = this.afs.collection<Medicos>('Medicos');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getMedicos() {
    return this.medicosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  addMedico(medicos: Medicos) {
    return this.medicosCollection.add(medicos);
  }

  getMedico(id: string) {
    return this.medicosCollection.doc<Medicos>(id).valueChanges();
  }

  updateMedico(id: string, medicos: Medicos) {
    return this.medicosCollection.doc<Medicos>(id).update(medicos);
  }

  deleteMedico(id: string) {
    return this.medicosCollection.doc(id).delete();
  }
}
