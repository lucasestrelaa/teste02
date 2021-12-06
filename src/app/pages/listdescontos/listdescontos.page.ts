import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Descontos } from 'src/app/interfaces/descontos';
import { AuthService } from 'src/app/services/auth.service';
import { ConsultaService } from 'src/app/services/consulta.service';
import { DescontosService } from 'src/app/services/descontos.service';

@Component({
  selector: 'app-listdescontos',
  templateUrl: './listdescontos.page.html',
  styleUrls: ['./listdescontos.page.scss'],
})
export class ListdescontosPage implements OnInit {
  private loading: any;
  public descontos = new Array<Descontos>();
  private descontoSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private route: Router,
    private loadingCtrl: LoadingController,
    private descontoService: DescontosService,
    private toastCtrl: ToastController
  ) { 
    this.descontoSubscription = this.descontoService.getDescontos().subscribe(data => {
      this.descontos = data;
      console.log(this.descontos)
    });
    console.log(this.descontos.length)
  }

  ngOnInit() {
    
  }
  ngOnDestroy() {
    this.descontoSubscription.unsubscribe();
  }
  async deleteDesconto(id: string) {
    try {
      await this.descontoService.deleteDesconto(id);
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
