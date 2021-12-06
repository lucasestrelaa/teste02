import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Descontos } from 'src/app/interfaces/descontos';
import { AuthService } from 'src/app/services/auth.service';
import { DescontosService } from 'src/app/services/descontos.service';

@Component({
  selector: 'app-descontos',
  templateUrl: './descontos.page.html',
  styleUrls: ['./descontos.page.scss'],
})
export class DescontosPage implements OnInit {
  private descontoId: string = null;
  public desconto: Descontos = {};
  private loading: any;
  private descontoSubscription: Subscription;
  constructor(
    private descontoService: DescontosService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) { 
    this.descontoId = this.activatedRoute.snapshot.params['id'];
    

    if (this.descontoId) this.loadDesconto();
  }

  ngOnInit() {
  }
  loadDesconto() {
    console.log("teste"+this.descontoId);
    this.descontoSubscription = this.descontoService.getDesconto(this.descontoId).subscribe(data => {
      this.desconto = data;
      //console.log(data + "Medico data")
    });
  }
  async saveDesconto() {
    await this.presentLoading();

    //this.medico.id = (await this.authService.getAuth().currentUser).uid;

    if (this.descontoId) {
      try {
        await this.descontoService.updateDesconto(this.descontoId, this.desconto);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/listdescontos');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.medico.createdAt = new Date().getTime();

      try {
        
        await this.descontoService.addDesconto(this.desconto);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/listdescontos');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }
  voltar(){
    this.route.navigate(['/listdescontos']);
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
