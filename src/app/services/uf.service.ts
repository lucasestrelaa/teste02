import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Uf } from '../interfaces/uf';

@Injectable({
  providedIn: 'root'
})
export class UfService {
  private ufsCollection: AngularFirestoreCollection<Uf>;
  public uf: Uf = {};
  public ufs: Uf = {};
  constructor(
    private afs: AngularFirestore
  ) {
    this.ufsCollection = this.afs.collection<Uf>('Uf');
   }
   getUfs() {
    return this.ufsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }
  addUf(uf: Uf) {
    return this.ufsCollection.add(uf);
  }
  getUf(id: string) {
    return this.ufsCollection.doc<Uf>(id).valueChanges();
  }

  updateUf(id: string, uf: Uf) {
    return this.ufsCollection.doc<Uf>(id).update(uf);
  }

  deleteUf(id: string) {
    return this.ufsCollection.doc(id).delete();
  }
}
