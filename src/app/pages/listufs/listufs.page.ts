import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Uf } from 'src/app/interfaces/uf';
import { AuthService } from 'src/app/services/auth.service';
import { UfService } from 'src/app/services/uf.service';

@Component({
  selector: 'app-listufs',
  templateUrl: './listufs.page.html',
  styleUrls: ['./listufs.page.scss'],
})
export class ListufsPage implements OnInit {
  private loading: any;
  public ufs = new Array<Uf>();
  private ufsSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private route: Router,
    private loadingCtrl: LoadingController,
    private ufService: UfService,
    private toastCtrl: ToastController
  ) { 
    this.ufsSubscription = this.ufService.getUfs().subscribe(data => {
      this.ufs = data;
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.ufsSubscription.unsubscribe();
  }
  async deleteUf(id: string) {
    try {
      await this.ufService.deleteUf(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }
  voltar(){
    this.route.navigate(['/adm']);
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
