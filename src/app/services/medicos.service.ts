import { Injectable } from '@angular/core';
import { Medicos } from '../interfaces/medicos';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  private medicosCollection: AngularFirestoreCollection<Medicos>;

  constructor(private afs: AngularFirestore) {
    this.medicosCollection = this.afs.collection<Medicos>('Medicos');
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

  addMedico(medico: Medicos) {
    return this.medicosCollection.add(medico);
  }

  getMedico(id: string) {
    return this.medicosCollection.doc<Medicos>(id).valueChanges();
  }

  updateMedico(id: string, medico: Medicos) {
    return this.medicosCollection.doc<Medicos>(id).update(medico);
  }

  deleteMedico(id: string) {
    return this.medicosCollection.doc(id).delete();
  }
}
