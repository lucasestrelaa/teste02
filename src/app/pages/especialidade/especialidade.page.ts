import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Especialidades } from 'src/app/interfaces/especialidades';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialidadeService } from 'src/app/services/especialidade.service';

@Component({
  selector: 'app-especialidade',
  templateUrl: './especialidade.page.html',
  styleUrls: ['./especialidade.page.scss'],
})
export class EspecialidadePage implements OnInit {
  private especialidadeId: string = null;
  public especialidade: Especialidades = {};
  private loading: any;
  private especialidadeSubscription: Subscription;
  constructor(
    private especialidadeService: EspecialidadeService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) { 
    this.especialidadeId = this.activatedRoute.snapshot.params['id'];
    

    if (this.especialidadeId) this.loadEspecialidade();
  }

  ngOnInit() {
  }
  loadEspecialidade() {
    console.log("teste"+this.especialidadeId);
    this.especialidadeSubscription = this.especialidadeService.getEspecialidade(this.especialidadeId).subscribe(data => {
      this.especialidade = data;
      //console.log(data + "Medico data")
    });
  }
  async saveEspecialidade() {
    await this.presentLoading();

    //this.medico.id = (await this.authService.getAuth().currentUser).uid;

    if (this.especialidadeId) {
      try {
        await this.especialidadeService.updateEspecialidade(this.especialidadeId, this.especialidade);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/listespecialidades');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.medico.createdAt = new Date().getTime();

      try {
        
        await this.especialidadeService.addEspecialidade(this.especialidade);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/listespecialidades');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }
  voltar(){
    this.route.navigate(['/listespecialidades']);
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
