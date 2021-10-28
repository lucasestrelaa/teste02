import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afa: AngularFireAuth,
    private route: Router,

  ) { }

  login(user: User) {
    this.afa.signInWithEmailAndPassword(user.email, user.password);
  }
  register(user: User) {
    return this.afa.createUserWithEmailAndPassword(user.email, user.password);
  }
  logout() {

  }
  getAuth() {
    return this.afa;
  }

}
