import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public user: User = {};
  private loading: any;
  private usuarioId: string;
  public usuario: User = {};
  public usuarios: User = {};
  private Iduser: string;
  private email: string;
  public userEmail: string;
  private usuarioSubscription: Subscription;
  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
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
  async sair() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.log(error)
    } finally {
      //this.loading.;
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }



  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }




}
