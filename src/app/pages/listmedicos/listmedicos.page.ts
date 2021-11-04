import { Component, OnInit } from '@angular/core';
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

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
