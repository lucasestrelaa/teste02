import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Consulta } from 'src/app/interfaces/consulta';
import { AuthService } from 'src/app/services/auth.service';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-listconsultas',
  templateUrl: './listconsultas.page.html',
  styleUrls: ['./listconsultas.page.scss'],
})
export class ListconsultasPage implements OnInit {
  private loading: any;
  public consultas = new Array<Consulta>();
  private consultaSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private route: Router,
    private loadingCtrl: LoadingController,
    private consultaService: ConsultaService,
    private toastCtrl: ToastController
  ) { 
    this.consultaSubscription = this.consultaService.getConsultas().subscribe(data => {
      this.consultas = data;
    });
    console.log(this.consultas.length)
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.consultaSubscription.unsubscribe();
  }

  async deleteClinica(id: string) {
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
