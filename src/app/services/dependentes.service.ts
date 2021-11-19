import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Dependentes } from '../interfaces/dependentes';

@Injectable({
  providedIn: 'root'
})
export class DependentesService {
  private DependentesCollection: AngularFirestoreCollection<Dependentes>;
  public dependente: Dependentes = {};
  public dependentes: Dependentes = {};
  constructor(private afs: AngularFirestore) {
    this.DependentesCollection = this.afs.collection<Dependentes>('Dependentes');
  }

  getDependentes() {
    return this.DependentesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }
  addDependente(Dependente: Dependentes) {
    return this.DependentesCollection.add(Dependente);
  }
  getDependente(id: string) {
    return this.DependentesCollection.doc<Dependentes>(id).valueChanges();
  }

  updateDependente(id: string, Dependente: Dependentes) {
    return this.DependentesCollection.doc<Dependentes>(id).update(Dependente);
  }

  deleteDependente(id: string) {
    return this.DependentesCollection.doc(id).delete();
  }
}
