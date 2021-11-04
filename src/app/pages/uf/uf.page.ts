import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Uf } from 'src/app/interfaces/uf';
import { AuthService } from 'src/app/services/auth.service';
import { UfService } from 'src/app/services/uf.service';

@Component({
  selector: 'app-uf',
  templateUrl: './uf.page.html',
  styleUrls: ['./uf.page.scss'],
})
export class UfPage implements OnInit {

  private ufId: string = null;
  public uf: Uf = {};
  private loading: any;
  private ufSubscription: Subscription;
  constructor(
    private ufService: UfService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) { 
    this.ufId = this.activatedRoute.snapshot.params['id'];
    

    if (this.ufId) this.loadUf();
  }

  ngOnInit() {
  }
  loadUf() {
    console.log("teste"+this.ufId);
    this.ufSubscription = this.ufService.getUf(this.ufId).subscribe(data => {
      this.uf = data;
      //console.log(data + "Medico data")
    });
  }
  async saveUf() {
    await this.presentLoading();

    //this.medico.id = (await this.authService.getAuth().currentUser).uid;

    if (this.ufId) {
      try {
        await this.ufService.updateUf(this.ufId, this.uf);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/listufs');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.medico.createdAt = new Date().getTime();

      try {
        
        await this.ufService.addUf(this.uf);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/listufs');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }
  voltar(){
    this.route.navigate(['/listufs']);
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
