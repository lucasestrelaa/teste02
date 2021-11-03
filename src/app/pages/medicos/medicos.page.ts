import { Component, OnInit } from '@angular/core';
import { MedicosService } from 'src/app/services/medicos.service';
import { Medicos } from 'src/app/interfaces/medicos';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.page.html',
  styleUrls: ['./medicos.page.scss'],
})
export class MedicosPage implements OnInit {

  private medicoId: string = null;
  private medico: Medicos = {};
  private loading: any;
  private medicoSubscription: Subscription;
  

  constructor(
    private medicoService: MedicosService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.medicoId = this.activatedRoute.snapshot.params['id'];

    if (this.medicoId) this.loadmedico();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.medicoSubscription) this.medicoSubscription.unsubscribe();
  }

  loadmedico() {
    this.medicoSubscription = this.medicoService.getMedico(this.medicoId).subscribe(data => {
      this.medico = data;
    });
  }

  async savemedico() {
    //console.log(this.medico);
    await this.presentLoading();

    this.medico.id = (await this.authService.getAuth().currentUser).uid;

    if (this.medicoId) {
      try {
        await this.medicoService.updateMedico(this.medicoId, this.medico);
        await this.loading.dismiss();
        console.log('atualizou')
        this.navCtrl.navigateBack('/medicoslist');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.medico.createdAt = new Date().getTime();
      console.log(this.medico.nome)
      try {
        await this.medicoService.addMedico(this.medico);
        await this.loading.dismiss();
        console.log('salvou')
        this.navCtrl.navigateBack('/medicoslist');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }

  lastPage(){
    this.route.navigate(['/medicoslist']);
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
