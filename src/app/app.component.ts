import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from './interfaces/user';
import { AuthService } from './services/auth.service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private usuarioId: string;
  public usuario: User = {};
  public usuarios: User = {};
  private Iduser: string;
  private email: string;
  public userEmail: string;
  private usuarioSubscription: Subscription;
  constructor(
    private usuarioService: UsuarioService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.loadUsuario();
  }
  async loadUsuario() {

    this.usuarioId = (await this.authService.getAuth().currentUser).uid;

    this.email = (await this.authService.getAuth().currentUser).email;
    console.log(this.userEmail + this.email)
    this.usuarioSubscription = this.usuarioService.getUsuarios().subscribe(data => {
      for (let x = 0; x < data.length; x++) {
        if (data[x].id == this.usuarioId) {
          this.usuario = data[x];
          this.usuarios = data[x];
          this.Iduser = data[x].id;
          //console.log(this.usuarios.profissao+ " " + this.usuarios.id)
        } else {
          this.usuarios.email = this.email;
          //this.usuarios.id = this.userId;
          //console.log(this.usuarios.phoneNumber + this.usuarios.id + "13")
        }
      }
    });
    //if (this.userId) this.loadUsuario();
  }
}
