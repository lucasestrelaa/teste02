import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recupera',
  templateUrl: './recupera.page.html',
  styleUrls: ['./recupera.page.scss'],
})
export class RecuperaPage implements OnInit {
  public userLogin: User = {};
  public userRegister: User = {};
  public userRecupera: User = {};

  public loading: any;
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private route: Router,
  ) { }

  ngOnInit() {
  }
  async recupera() {
    await this.presentLoading();
    try {
      await this.authService.recupera(this.userRecupera);
      //this.route.navigate
      console.log('Email enviado!');
      this.route.navigate(['/login']);
    } catch (error) {
      console.error(error)
    } finally {
      this.loading.dismiss();
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
