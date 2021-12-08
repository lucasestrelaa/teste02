import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Especialidades } from 'src/app/interfaces/especialidades';
import { Medicoespecialidade } from 'src/app/interfaces/medicoespecialidade';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { MedicoespecialidadeService } from 'src/app/services/medicoespecialidade.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-medicoespecialidade',
  templateUrl: './medicoespecialidade.page.html',
  styleUrls: ['./medicoespecialidade.page.scss'],
})
export class MedicoespecialidadePage implements OnInit {
  public usuarioId : string;
  public medicoespecialidadeId : string;

  //private usuarioId: string;
  public usuario: User = {};
  public usuarios: User = {};
  private Iduser: string;
  private email: string;
  public userEmail: string;
  public userLogin: User = {};

  public especialidades = new Array<Especialidades>();
  private especialidadesSubscription: Subscription;
  //public usuarios = new Array<User>();
  private usuarioSubscription: Subscription;

  public medicoespecialidade: Medicoespecialidade = {};
  private medicoEspecialidadeSubscription: Subscription;
  private loading: any;
  constructor(
    private usuarioService: UsuarioService,
    private especialidadeService: EspecialidadeService,
    private medicoespecialidadeService: MedicoespecialidadeService,

    private activatedRoute: ActivatedRoute,
    private route: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) { 
    this.medicoespecialidadeId = this.activatedRoute.snapshot.params['id'];
      this.especialidadesSubscription = this.especialidadeService.getEspecialidades().subscribe(data => {
        this.especialidades = data;
      });
      this.loadUsuario();
    if (this.medicoespecialidadeId) this.loadMedicoEspecialidade();

  }

  ngOnInit() {
  }
  async loadUsuario() {
    //this.phoneNumber = (await this.authService.getAuth().currentUser).phoneNumber;
    //this.user.phoneNumber =  (await this.authService.getAuth().currentUser).phoneNumber;
    this.usuarioId = (await this.authService.getAuth().currentUser).uid;
    //this.email = (await this.authService.getAuth().currentUser).email;
    //console.log(this.userEmail + this.email)
    this.usuarioSubscription = this.usuarioService.getUsuarios().subscribe(data => {
      for (let x = 0; x < data.length; x++) {
        if (data[x].id == this.usuarioId) {
          this.usuario = data[x];
          this.usuarios = data[x];
          this.Iduser = data[x].id;
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
  
  loadMedicoEspecialidade() {
    console.log("teste"+this.medicoespecialidadeId);
    this.medicoEspecialidadeSubscription = this.medicoespecialidadeService.getEspecialidadeMedico(this.medicoespecialidadeId).subscribe(data => {
      this.medicoespecialidade = data;
      //console.log(data + "Medico data")
    });
  }

  async saveMedicoespecialidade() {
    await this.presentLoading();

    //this.medico.id = (await this.authService.getAuth().currentUser).uid;

    if (this.medicoespecialidadeId) {
      try {
        await this.medicoespecialidadeService.updateEspecialidadeMedico(this.medicoespecialidadeId, this.medicoespecialidade);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/listclinicas');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.medico.createdAt = new Date().getTime();

      try {
        
        await this.medicoespecialidadeService.addEspecialidadeMedico(this.medicoespecialidade);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/listmedicoespecialidade');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }


  voltar(){
    this.route.navigate(['/listmedicoespecialidade']);
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
