import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Especialidades } from '../interfaces/especialidades';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {
  private especialidadesCollection: AngularFirestoreCollection<Especialidades>;
  public especialidade: Especialidades = {};
  public especialidades: Especialidades = {};
  constructor(
    private afs: AngularFirestore
  ) { 
    this.especialidadesCollection = this.afs.collection<Especialidades>('Especialidades');
  }
  getEspecialidades() {
    return this.especialidadesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }
  addEspecialidade(especialidade: Especialidades) {
    return this.especialidadesCollection.add(especialidade);
  }
  getEspecialidade(id: string) {
    return this.especialidadesCollection.doc<Especialidades>(id).valueChanges();
  }

  updateEspecialidade(id: string, especialidade: Especialidades) {
    return this.especialidadesCollection.doc<Especialidades>(id).update(especialidade);
  }

  deleteEspecialidade(id: string) {
    return this.especialidadesCollection.doc(id).delete();
  }
}
