import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Clinicas } from '../interfaces/clinicas';
import { Medicos } from '../interfaces/medicos';

@Injectable({
  providedIn: 'root'
})
export class ClinicasService {
  private clinicasCollection: AngularFirestoreCollection<Clinicas>;
  public medico: Medicos = {};
  public medicos: Medicos = {};
  constructor(private afs: AngularFirestore) { 
    this.clinicasCollection = this.afs.collection<Clinicas>('Clinicas');
  }

  getClinicas() {
    return this.clinicasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }
  addClinica(clinica: Clinicas) {
    return this.clinicasCollection.add(clinica);
  }
  getClinica(id: string) {
    return this.clinicasCollection.doc<Clinicas>(id).valueChanges();
  }

  updateClinica(id: string, clinica: Clinicas) {
    return this.clinicasCollection.doc<Clinicas>(id).update(clinica);
  }

  deleteClinica(id: string) {
    return this.clinicasCollection.doc(id).delete();
  }
}
