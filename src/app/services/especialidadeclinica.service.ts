import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Especialidadeclinica } from '../interfaces/especialidadeclinica';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeclinicaService {
  private especialidadeclinicaCollection: AngularFirestoreCollection<Especialidadeclinica>;
  public especialidade: Especialidadeclinica = {};
  public especialidades: Especialidadeclinica = {};
  constructor(
    private afs: AngularFirestore
  ) { 
    this.especialidadeclinicaCollection = this.afs.collection<Especialidadeclinica>('EspecialidadeClinica');
  }
  getEspecialidadeClinicas() {
    return this.especialidadeclinicaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }
  addEspecialidadeClinica(especialidadeclinica: Especialidadeclinica) {
    return this.especialidadeclinicaCollection.add(especialidadeclinica);
  }
  getEspecialidadeClinica(id: string) {
    return this.especialidadeclinicaCollection.doc<Especialidadeclinica>(id).valueChanges();
  }

  updateEspecialidadeClinica(id: string, especialidadeclinica: Especialidadeclinica) {
    return this.especialidadeclinicaCollection.doc<Especialidadeclinica>(id).update(especialidadeclinica);
  }

  deleteEspecialidadeClinica(id: string) {
    return this.especialidadeclinicaCollection.doc(id).delete();
  }
}
