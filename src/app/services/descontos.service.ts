import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Banner } from '../interfaces/banner';
import { Descontos } from '../interfaces/descontos';

@Injectable({
  providedIn: 'root'
})
export class DescontosService {
  private descontosCollection: AngularFirestoreCollection<Descontos>;
  //private bannerCollection: AngularFirestoreDocument<Banner>;
  public desconto: Descontos = {};
  public descontos: Descontos = {};
  constructor(private afs: AngularFirestore) { 
    this.descontosCollection = this.afs.collection<Descontos>('Descontos');
    //this.bannerCollection = this.afs.doc<Banner>('BannerProdutos');
  }
  getDescontos() {
    return this.descontosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }
  addDesconto(desconto: Descontos) {
    return this.descontosCollection.add(desconto);
  }
  getDesconto(id: string) {
    return this.descontosCollection.doc<Descontos>(id).valueChanges();
  }

  updateDesconto(id: string, desconto: Descontos) {
    return this.descontosCollection.doc<Descontos>(id).update(desconto);
  }

  deleteDesconto(id: string) {
    return this.descontosCollection.doc(id).delete();
  }
}
