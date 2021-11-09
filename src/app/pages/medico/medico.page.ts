import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Especialidades } from 'src/app/interfaces/especialidades';
import { Medicos } from 'src/app/interfaces/medicos';
import { Uf } from 'src/app/interfaces/uf';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { UfService } from 'src/app/services/uf.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.page.html',
  styleUrls: ['./medico.page.scss'],
})
export class MedicoPage implements OnInit {
  private medicoId: string = null;
  public medico: Medicos = {};

  public ufs = new Array<Uf>();
  private UfSubscription: Subscription;
  public especialidades = new Array<Especialidades>();
  private EspecialidadesSubscription: Subscription;

  private loading: any;
  private medicoSubscription: Subscription;
  constructor(
    private medicoService: MedicosService,
    private ufService: UfService,
    private especialidadeService: EspecialidadeService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.medicoId = this.activatedRoute.snapshot.params['id'];
    this.UfSubscription = this.ufService.getUfs().subscribe(data => {
      this.ufs = data;
    });
    this.EspecialidadesSubscription = this.especialidadeService.getEspecialidades().subscribe(data => {
      this.especialidades = data;
    });
    

    if (this.medicoId) this.loadMedico();

  }

  ngOnInit() {
  }
  loadMedico() {
    console.log("teste"+this.medicoId);
    this.medicoSubscription = this.medicoService.getMedico(this.medicoId).subscribe(data => {
      this.medico = data;
      //console.log(data + "Medico data")
    });
  }
  async saveMedico() {
    await this.presentLoading();

    //this.medico.id = (await this.authService.getAuth().currentUser).uid;

    if (this.medicoId) {
      try {
        await this.medicoService.updateMedico(this.medicoId, this.medico);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/listmedicos');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.medico.createdAt = new Date().getTime();

      try {
        
        await this.medicoService.addMedico(this.medico);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/listmedicos');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
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
