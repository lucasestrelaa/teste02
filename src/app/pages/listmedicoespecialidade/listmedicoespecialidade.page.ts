import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Especialidades } from 'src/app/interfaces/especialidades';
import { Medicoespecialidade } from 'src/app/interfaces/medicoespecialidade';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { MedicoespecialidadeService } from 'src/app/services/medicoespecialidade.service';

@Component({
  selector: 'app-listmedicoespecialidade',
  templateUrl: './listmedicoespecialidade.page.html',
  styleUrls: ['./listmedicoespecialidade.page.scss'],
})
export class ListmedicoespecialidadePage implements OnInit {
  private loading: any;
  public medicoespecialidades = new Array<Medicoespecialidade>();
  private medicoespecialidadesSubscription: Subscription;
  constructor(
    private route: Router,
    private loadingCtrl: LoadingController,
    private medicoespecialidadeService: MedicoespecialidadeService,
    private toastCtrl: ToastController,
    private authService: AuthService,
    public actionSheetController: ActionSheetController,
    private navCtrl: NavController,
  ) { 
    this.medicoespecialidadesSubscription = this.medicoespecialidadeService.getEspecialidadeMedicos().subscribe(data => {
      this.medicoespecialidades = data;
    });
  }

  ngOnInit() {
  }
  async deleteEspecialidade(id: string) {
    try {
      await this.medicoespecialidadeService.deleteEspecialidadeMedico(id);
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
  async sair() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.log(error)
    } finally {
      //this.loading.;
    }
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Logout',
        icon: 'log-out-outline',
        handler: () => {
          this.authService.logout();
          console.log('Share clicked');
        }
      },{
        text: 'Perfil',
        icon: 'person-outline',
        handler: () => {
          this.navCtrl.navigateRoot('/tabs/tab5');
          console.log('/tabs/tab5');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
