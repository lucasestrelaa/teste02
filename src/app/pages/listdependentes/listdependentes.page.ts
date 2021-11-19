import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Dependentes } from 'src/app/interfaces/dependentes';
import { AuthService } from 'src/app/services/auth.service';
import { ClinicasService } from 'src/app/services/clinicas.service';
import { DependentesService } from 'src/app/services/dependentes.service';

@Component({
  selector: 'app-listdependentes',
  templateUrl: './listdependentes.page.html',
  styleUrls: ['./listdependentes.page.scss'],
})
export class ListdependentesPage implements OnInit {
  private loading: any;
  public dependentes = new Array<Dependentes>();
  private dependentesSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private route: Router,
    private loadingCtrl: LoadingController,
    private dependenteService: DependentesService,
    private toastCtrl: ToastController
  ) {
    this.dependentesSubscription = this.dependenteService.getDependentes().subscribe(data => {
      this.dependentes = data;
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.dependentesSubscription.unsubscribe();
  }

  async deleteDependente(id: string) {
    try {
      await this.dependenteService.deleteDependente(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  voltar() {
    this.route.navigate(['/tabs/tab5']);
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
