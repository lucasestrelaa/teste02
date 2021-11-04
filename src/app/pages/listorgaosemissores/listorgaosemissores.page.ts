import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Orgaoemissor } from 'src/app/interfaces/orgaoemissor';
import { AuthService } from 'src/app/services/auth.service';
import { OrgaoemissorService } from 'src/app/services/orgaoemissor.service';

@Component({
  selector: 'app-listorgaosemissores',
  templateUrl: './listorgaosemissores.page.html',
  styleUrls: ['./listorgaosemissores.page.scss'],
})
export class ListorgaosemissoresPage implements OnInit {
  private loading: any;
  public orgaoemissores = new Array<Orgaoemissor>();
  private orgaoemissoresSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private route: Router,
    private loadingCtrl: LoadingController,
    private orgaoemissorService: OrgaoemissorService,
    private toastCtrl: ToastController
  ) { 
    this.orgaoemissoresSubscription = this.orgaoemissorService.getOrgaoemissores().subscribe(data => {
      this.orgaoemissores = data;
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.orgaoemissoresSubscription.unsubscribe();
  }
  async deleteOrgaoemissor(id: string) {
    try {
      await this.orgaoemissorService.deleteOrgaoemissor(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }
  voltar(){
    this.route.navigate(['/adm']);
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
