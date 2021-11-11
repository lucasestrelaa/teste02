import { Component } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Uf } from 'src/app/interfaces/uf';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UfService } from 'src/app/services/uf.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  private userId: string;
  public user: User = {};
  public usuarios: User = {};
  private Iduser: string;

  private email: string;

  public ufs = new Array<Uf>();

  private userSubscription: Subscription;
  private UfSubscription: Subscription;
  private loading: any;
  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private ufService: UfService,

    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
  ) {
    this.getUser();

    this.UfSubscription = this.ufService.getUfs().subscribe(data => {
      this.ufs = data;
    });
  }

  async getUser() {
    this.userId = (await this.authService.getAuth().currentUser).uid;
    this.email = (await this.authService.getAuth().currentUser).email;
    console.log('email: ' + this.email)

    this.userSubscription = this.usuarioService.getUsuarios().subscribe(data => {
      console.log(data.length)
      if (data.length > 0) {
        for (let x = 0; x < data.length; x++) {
          console.log(data[x].id + "-" + this.userId)
          if (data[x].id === this.userId) {
            this.user = data[x];
            this.usuarios = data[x];
            this.Iduser = data[x].id;
          } else {
            console.log('email');
            this.usuarios.email = this.email;
          }
        }
      } else {
        this.usuarios.email = this.email;
      }

    });
    //if (this.userId) this.loadUsuario();
  }
  async salvarUsuario() {

    await this.presentLoading();
    //this.user.id = (await this.authService.getAuth().currentUser).uid;
    //console.log((await this.authService.getAuth().currentUser).email);
    //console.log(this.usuarios.id+" asnfogunasfognaosignosmgasdg")
    if (this.usuarios.id) {
      //console.log(this.usuarios + " 1234");
      //console.log(this.Iduser + " 1234")
      try {
        //console.log(this.usuarios);
        //console.log(this.Iduser);
        //usuarios
        // 1 = Adm || 2 = criador de enquetes || 3 = usuario simples
        if (!this.usuarios.tipoUser) {
          setTimeout(await this.loading.dismiss(), 3000);
          if (!this.usuarios.tipoUser) {
            this.usuarios.tipoUser = 3;
          }
        } else {

        }

        await this.usuarioService.updateUsuario(this.usuarios.id, this.usuarios);
        await this.loading.dismiss();
        this.presentToast('Usuário salvo!');
        //this.navCtrl.navigateBack('/home');
      } catch (error) {
        console.log(error)
        this.presentToast('Erro ao tentar salvar1!');
        this.loading.dismiss();
      }
    } else {
      //this.user.data = new Date().getTime();

      try {
        this.usuarios.tipoUser = 3;
        this.usuarios.id = (await this.authService.getAuth().currentUser).uid;
        await this.usuarioService.addUsuario(this.usuarios.id, this.usuarios);
        await this.loading.dismiss();

        //this.navCtrl.navigateBack('/');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar!');
        this.loading.dismiss();
      }
    }

  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor aguarde!' });
    return this.loading.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
