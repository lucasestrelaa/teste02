import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Clinicas } from 'src/app/interfaces/clinicas';
import { AuthService } from 'src/app/services/auth.service';
import { ClinicasService } from 'src/app/services/clinicas.service';
import { MedicosService } from 'src/app/services/medicos.service';

@Component({
  selector: 'app-listclinicas',
  templateUrl: './listclinicas.page.html',
  styleUrls: ['./listclinicas.page.scss'],
})
export class ListclinicasPage implements OnInit {
  private loading: any;
  public clinicas = new Array<Clinicas>();
  private clinicasSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private route: Router,
    private loadingCtrl: LoadingController,
    private clinicaService: ClinicasService,
    private toastCtrl: ToastController
  ) {
    this.clinicasSubscription = this.clinicaService.getClinicas().subscribe(data => {
      this.clinicas = data;
    });
   }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.clinicasSubscription.unsubscribe();
  }

  async deleteClinica(id: string) {
    try {
      await this.clinicaService.deleteClinica(id);
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
