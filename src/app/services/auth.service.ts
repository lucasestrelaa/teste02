import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //public user: User = {}
  constructor(
    private afa: AngularFireAuth,
    private route: Router,


  ) { }

  login(user: User) {
    return this.afa.signInWithEmailAndPassword(user.email, user.password);
  }
  register(user: User) {
    return this.afa.createUserWithEmailAndPassword(user.email, user.password);
  }
  recupera(user: User){
    return this.afa.sendPasswordResetEmail(user.email);
  }
  logout() {
    this.getAuth();
    return this.afa.signOut().then(() => {

      this.route.navigate(['login']);
    }).catch(error => {
      console.log(error + '->erro');
    });

  }

  getAuth() {
    //console.log(this.afa);
    return this.afa;

  }

}
