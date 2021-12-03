import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Medicos } from 'src/app/interfaces/medicos';
import { AuthService } from 'src/app/services/auth.service';
import { MedicosService } from 'src/app/services/medicos.service';

@Component({
  selector: 'app-listmedicos',
  templateUrl: './listmedicos.page.html',
  styleUrls: ['./listmedicos.page.scss'],
})
export class ListmedicosPage implements OnInit {
  private loading: any;
  public medicos = new Array<Medicos>();
  private medicosSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private route: Router,
    private loadingCtrl: LoadingController,
    private medicoService: MedicosService,
    private toastCtrl: ToastController
  ) {
    this.medicosSubscription = this.medicoService.getMedicos().subscribe(data => {
      this.medicos = data;
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.medicosSubscription.unsubscribe();
  }

  async deleteMedico(id: string) {
    try {
      await this.medicoService.deleteMedico(id);
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
