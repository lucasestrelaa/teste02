import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Especialidades } from 'src/app/interfaces/especialidades';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialidadeService } from 'src/app/services/especialidade.service';

@Component({
  selector: 'app-listespecialidades',
  templateUrl: './listespecialidades.page.html',
  styleUrls: ['./listespecialidades.page.scss'],
})
export class ListespecialidadesPage implements OnInit {
  private loading: any;
  public especialidades = new Array<Especialidades>();
  private especialidadesSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private route: Router,
    private loadingCtrl: LoadingController,
    private especialidadeService: EspecialidadeService,
    private toastCtrl: ToastController
  ) { 
    this.especialidadesSubscription = this.especialidadeService.getEspecialidades().subscribe(data => {
      this.especialidades = data;
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.especialidadesSubscription.unsubscribe();
  }
  async deleteEspecialidade(id: string) {
    try {
      await this.especialidadeService.deleteEspecialidade(id);
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
