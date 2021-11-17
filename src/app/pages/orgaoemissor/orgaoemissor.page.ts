import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Orgaoemissor } from 'src/app/interfaces/orgaoemissor';
import { AuthService } from 'src/app/services/auth.service';
import { OrgaoemissorService } from 'src/app/services/orgaoemissor.service';

@Component({
  selector: 'app-orgaoemissor',
  templateUrl: './orgaoemissor.page.html',
  styleUrls: ['./orgaoemissor.page.scss'],
})
export class OrgaoemissorPage implements OnInit {
  private orgaoemissorId: string = null;
  public orgaoemissor: Orgaoemissor = {};
  private loading: any;
  private orgaoemissorSubscription: Subscription;
  constructor(
    private orgaoemissorService: OrgaoemissorService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) { 
    this.orgaoemissorId = this.activatedRoute.snapshot.params['id'];
    

    if (this.orgaoemissorId) this.loadOrgaoemissor();
  }

  ngOnInit() {
  }
  loadOrgaoemissor() {
    console.log("teste"+this.orgaoemissorId);
    this.orgaoemissorSubscription = this.orgaoemissorService.getOrgaoemissor(this.orgaoemissorId).subscribe(data => {
      this.orgaoemissor = data;
      //console.log(data + "Medico data")
    });
  }
  async saveOrgaoemissor() {
    await this.presentLoading();

    //this.medico.id = (await this.authService.getAuth().currentUser).uid;

    if (this.orgaoemissorId) {
      try {
        await this.orgaoemissorService.updateOrgaoemissor(this.orgaoemissorId, this.orgaoemissor);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/listorgaosemissores');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.medico.createdAt = new Date().getTime();

      try {
        
        await this.orgaoemissorService.addOrgaoemissor(this.orgaoemissor);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/listorgaosemissores');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }
  voltar(){
    this.route.navigate(['/listorgaosemissores']);
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
