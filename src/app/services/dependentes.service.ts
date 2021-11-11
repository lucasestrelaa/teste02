import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Dependentes } from '../interfaces/dependentes';

@Injectable({
  providedIn: 'root'
})
export class DependentesService {
  private dependentesCollection: AngularFirestoreCollection<Dependentes>;
  constructor(
    private afs: AngularFirestore
  ) {
    this.dependentesCollection = afs.collection<Dependentes>('Dependentes');
  }
  getDependentes() {
    return this.dependentesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    )
  }
  addDependente(id: string, dependente: Dependentes) {
    return this.dependentesCollection.doc(id).set(dependente);
    //('Usuarios').doc
    this.dependentesCollection.add(dependente);
  }
  getDependente(id: string) {
    //console.log("recuperado");
    return this.dependentesCollection.doc<Dependentes>(id).valueChanges();
  }
  updateDependente(id: string, dependente: Dependentes) {

    return this.dependentesCollection.doc<Dependentes>(id).update(dependente);
  }
  deleteDependente(id: string) {
    return this.dependentesCollection.doc(id).delete();
  }
}
