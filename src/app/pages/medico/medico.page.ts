import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Medicos } from 'src/app/interfaces/medicos';
import { AuthService } from 'src/app/services/auth.service';
import { MedicosService } from 'src/app/services/medicos.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.page.html',
  styleUrls: ['./medico.page.scss'],
})
export class MedicoPage implements OnInit {
  private medicoId: string = null;
  public medico: Medicos = {};
  private loading: any;
  private medicoSubscription: Subscription;
  constructor(
    private medicoService: MedicosService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.medicoId = this.activatedRoute.snapshot.params['id'];

    if (this.medicoId) this.loadMedico();
  }

  ngOnInit() {
  }
  loadMedico() {
    this.medicoSubscription = this.medicoService.getMedico(this.medicoId).subscribe(data => {
      this.medico = data;
    });
  }
  async saveProduct() {
    await this.presentLoading();

    this.medico.id = (await this.authService.getAuth().currentUser).uid;

    if (this.medicoId) {
      try {
        await this.medicoService.updateMedico(this.medicoId, this.medico);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/listMedicos');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.medico.createdAt = new Date().getTime();

      try {
        await this.medicoService.addMedico(this.medico);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/listMedicos');
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
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
