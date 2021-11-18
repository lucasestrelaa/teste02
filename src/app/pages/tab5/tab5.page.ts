import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  private usuarioId: string = null;
  public usuario: User = {};
  public userEmail: string;
  private usuarioSubscription: Subscription;

  private loading: any;
  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) { 
    this.usuarioId = this.activatedRoute.snapshot.params['id'];
    if(this.usuarioId) this.loadUsuario();
  }
  async loadUsuario() {
    this.userEmail = (await this.authService.getAuth().currentUser).uid;
    console.log("teste"+this.usuarioId);
    this.usuarioSubscription = this.usuarioService.getUsuario(this.usuarioId).subscribe(data => {
      this.usuario = data;
      //console.log(data + "Medico data")
    });
  }

  async saveClinica() {
    await this.presentLoading();

    //this.medico.id = (await this.authService.getAuth().currentUser).uid;

    if (this.usuarioId) {
      try {
        await this.usuarioService.updateUsuario(this.usuarioId, this.usuario);
        await this.loading.dismiss();
        this.presentToast('Usuario Atualizado');
        //this.navCtrl.navigateBack('/listclinicas');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.medico.createdAt = new Date().getTime();

      try {
        this.usuario.email = this.userEmail
        this.usuario.id = this.usuarioId;
        await this.usuarioService.addUsuario(this.usuario);
        await this.loading.dismiss();
        this.presentToast('Usuário salvo');
        //this.navCtrl.navigateBack('/listclinicas');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000 });
    toast.present();
  }

}
