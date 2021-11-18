import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioCollection: AngularFirestoreCollection<User>;
  constructor(private afs: AngularFirestore) { 
    this.usuarioCollection = this.afs.collection<User>('Usuario');
  }
  getUsuarios() {
    return this.usuarioCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }
  addUsuario(usuario: User) {
    return this.usuarioCollection.add(usuario);
  }
  getUsuario(id: string) {
    return this.usuarioCollection.doc<User>(id).valueChanges();
  }

  updateUsuario(id: string, usuario: User) {
    return this.usuarioCollection.doc<User>(id).update(usuario);
  }
}
