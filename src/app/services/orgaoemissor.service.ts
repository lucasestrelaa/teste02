import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Orgaoemissor } from '../interfaces/orgaoemissor';

@Injectable({
  providedIn: 'root'
})
export class OrgaoemissorService {
  private orgaoemissoresCollection: AngularFirestoreCollection<Orgaoemissor>;
  public orgaoemissor: Orgaoemissor = {};
  public orgaoemissors: Orgaoemissor = {};
  constructor(
    private afs: AngularFirestore
  ) {
    this.orgaoemissoresCollection = this.afs.collection<Orgaoemissor>('Orgaoemissor');
   }
   getOrgaoemissores() {
    return this.orgaoemissoresCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  } 
  addOrgaoemissor(orgaoemissor: Orgaoemissor) {
    return this.orgaoemissoresCollection.add(orgaoemissor);
  }
  getOrgaoemissor(id: string) {
    return this.orgaoemissoresCollection.doc<Orgaoemissor>(id).valueChanges();
  }

  updateOrgaoemissor(id: string, orgaoemissor: Orgaoemissor) {
    return this.orgaoemissoresCollection.doc<Orgaoemissor>(id).update(orgaoemissor);
  }

  deleteOrgaoemissor(id: string) {
    return this.orgaoemissoresCollection.doc(id).delete();
  }
}
