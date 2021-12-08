import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Medicoespecialidade } from '../interfaces/medicoespecialidade';

@Injectable({
  providedIn: 'root'
})
export class MedicoespecialidadeService {
  private medicoespecialidadeCollection: AngularFirestoreCollection<Medicoespecialidade>;
  public medicoespecialidade: Medicoespecialidade = {};
  public medicoespecialidades: Medicoespecialidade = {};
  constructor(
    private afs: AngularFirestore
  ) { 
    this.medicoespecialidadeCollection = this.afs.collection<Medicoespecialidade>('EspecialidadeMedico');
  }
  getEspecialidadeMedicos() {
    return this.medicoespecialidadeCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }
  addEspecialidadeMedico(especialidademedico: Medicoespecialidade) {
    return this.medicoespecialidadeCollection.add(especialidademedico);
  }
  getEspecialidadeMedico(id: string) {
    return this.medicoespecialidadeCollection.doc<Medicoespecialidade>(id).valueChanges();
  }

  updateEspecialidadeMedico(id: string, especialidademedico: Medicoespecialidade) {
    return this.medicoespecialidadeCollection.doc<Medicoespecialidade>(id).update(especialidademedico);
  }

  deleteEspecialidadeMedico(id: string) {
    return this.medicoespecialidadeCollection.doc(id).delete();
  }
}
