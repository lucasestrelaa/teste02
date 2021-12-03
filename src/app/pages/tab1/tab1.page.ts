import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Consulta } from 'src/app/interfaces/consulta';
import { AuthService } from 'src/app/services/auth.service';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private loading: any;
  public consultas = new Array<Consulta>();
  public consultasPaciente = new Array<Consulta>();
  private consultaSubscription: Subscription;

  
  constructor(
    private authService: AuthService,
    private route: Router,
    private loadingCtrl: LoadingController,
    private consultaService: ConsultaService,
    private toastCtrl: ToastController
  ) {
    this.consultaSubscription = this.consultaService.getConsultas().subscribe(data => {
      for(let i = 0; i < data.length; i++){
        console.log("console tab 1")
      }
      this.consultas = data;
    });

  }
  ngOnDestroy() {
    this.consultaSubscription.unsubscribe();
  }

  async deleteConsulta(id: string) {
    try {
      await this.consultaService.deleteConsulta(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  voltar(){
    this.route.navigate(['/adm']);
  }
  doRefresh(event) {
    console.log('Begin async operation');
    window.location.reload()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
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
