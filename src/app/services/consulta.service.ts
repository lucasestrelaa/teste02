import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Consulta } from '../interfaces/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private consultasCollection: AngularFirestoreCollection<Consulta>;
  public consulta: Consulta = {};
  public consultas: Consulta = {};
  constructor(private afs: AngularFirestore) {
    this.consultasCollection = this.afs.collection<Consulta>('Consulta');
  }
  getConsultas() {
    return this.consultasCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  addConsulta(consulta: Consulta) {
    return this.consultasCollection.add(consulta);
  }
  getConsulta(id: string) {
    return this.consultasCollection.doc<Consulta>(id).valueChanges();
  }

  updateConsulta(id: string, consulta: Consulta) {
    return this.consultasCollection.doc<Consulta>(id).update(consulta);
  }

  deleteConsulta(id: string) {
    return this.consultasCollection.doc(id).delete();
  }
}
