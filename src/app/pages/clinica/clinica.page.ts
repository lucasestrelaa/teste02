import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Clinicas } from 'src/app/interfaces/clinicas';
import { Uf } from 'src/app/interfaces/uf';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ClinicasService } from 'src/app/services/clinicas.service';
import { UfService } from 'src/app/services/uf.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-clinica',
  templateUrl: './clinica.page.html',
  styleUrls: ['./clinica.page.scss'],
})
export class ClinicaPage implements OnInit {
  private usuarioId: string;
  public usuario: User = {};
  public usuarios: User = {};
  private Iduser: string;
  private email: string;
  public userEmail: string;
  public userLogin: User = {};
  public pacientes: {};
  private usuarioSubscription: Subscription;

  private clinicaId: string = null;
  public clinica: Clinicas = {};

  public ufs = new Array<Uf>();
  private UfSubscription: Subscription;

  private loading: any;
  private clinicaSubscription: Subscription;
  constructor(
    private usuarioService: UsuarioService,
    private clinicaService: ClinicasService,
    private ufService: UfService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
    ) { 
      this.clinicaId = this.activatedRoute.snapshot.params['id'];
      this.UfSubscription = this.ufService.getUfs().subscribe(data => {
        this.ufs = data;
      });
    
      this.loadUsuario();
    if (this.clinicaId) this.loadClinica();
    }

  ngOnInit() {
  }
  async loadUsuario() {
    //this.phoneNumber = (await this.authService.getAuth().currentUser).phoneNumber;
    //this.user.phoneNumber =  (await this.authService.getAuth().currentUser).phoneNumber;
    this.usuarioId = (await this.authService.getAuth().currentUser).uid;
    this.email = (await this.authService.getAuth().currentUser).email;
    console.log(this.userEmail + this.email)
    this.usuarioSubscription = this.usuarioService.getUsuarios().subscribe(data => {
      for (let x = 0; x < data.length; x++) {
        if (data[x].id == this.usuarioId) {
          this.usuario = data[x];
          this.usuarios = data[x];
          this.Iduser = data[x].id;
          this.pacientes = data[x];
          console.log(this.usuarios+ " " + this.usuarios.id)
        } else {
          this.usuarios.email = this.email;
          //this.usuarios.id = this.userId;
          //console.log(this.usuarios.phoneNumber + this.usuarios.id + "13")
        }
      }
    });
    //if (this.userId) this.loadUsuario();
  }
  loadClinica() {
    console.log("teste"+this.clinicaId);
    this.clinicaSubscription = this.clinicaService.getClinica(this.clinicaId).subscribe(data => {
      this.clinica = data;
      //console.log(data + "Medico data")
    });
  }
  async saveClinica() {
    await this.presentLoading();

    //this.medico.id = (await this.authService.getAuth().currentUser).uid;

    if (this.clinicaId) {
      try {
        await this.clinicaService.updateClinica(this.clinicaId, this.clinica);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/listclinicas');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.medico.createdAt = new Date().getTime();

      try {
        
        await this.clinicaService.addClinica(this.clinica);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/listclinicas');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }
  voltar(){
    this.route.navigate(['/listclinicas']);
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
