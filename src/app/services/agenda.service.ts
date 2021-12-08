import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Agenda } from '../interfaces/agenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private agendaCollection: AngularFirestoreCollection<Agenda>;
  public agenda: Agenda = {};
  public agendas: Agenda = {};
  constructor(
    private afs: AngularFirestore
  ) { 
    this.agendaCollection = this.afs.collection<Agenda>('Agendas');
  }
  getAgendas() {
    return this.agendaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }
  addEspecialidade(agenda: Agenda) {
    return this.agendaCollection.add(agenda);
  }
  getEspecialidade(id: string) {
    return this.agendaCollection.doc<Agenda>(id).valueChanges();
  }

  updateEspecialidade(id: string, agenda: Agenda) {
    return this.agendaCollection.doc<Agenda>(id).update(agenda);
  }

  deleteEspecialidade(id: string) {
    return this.agendaCollection.doc(id).delete();
  }
}
