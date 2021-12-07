import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Orgaoemissor } from 'src/app/interfaces/orgaoemissor';
import { Uf } from 'src/app/interfaces/uf';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { OrgaoemissorService } from 'src/app/services/orgaoemissor.service';
import { UfService } from 'src/app/services/uf.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  private usuarioId: string;
  public usuario: User = {};
  public usuarios: User = {};
  public pacientes: {};
  private Iduser: string;
  private email: string;
  public userEmail: string;
  private usuarioSubscription: Subscription;

  //Orgao emissor
  public orgaosemissores = new Array<Orgaoemissor>();
  private orgaoemissorSubscription: Subscription;

  //Uf
  public ufs = new Array<Uf>();
  private ufSubscription: Subscription;


  private loading: any;
  constructor(
    private usuarioService: UsuarioService,
    private ufService: UfService,
    private orgaoemissorService: OrgaoemissorService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.ufSubscription = this.ufService.getUfs().subscribe(data => {
      this.ufs = data;
    });
    this.orgaoemissorSubscription = this.orgaoemissorService.getOrgaoemissores().subscribe(data => {
      this.orgaosemissores = data;
    });
    //this.usuarioId = this.activatedRoute.snapshot.params['id'];
    this.loadUsuario();
    
  }
  async loadUsuario() {
    //this.phoneNumber = (await this.authService.getAuth().currentUser).phoneNumber;
    //this.user.phoneNumber =  (await this.authService.getAuth().currentUser).phoneNumber;
    this.usuarioId = (await this.authService.getAuth().currentUser).uid;
    console.log(this.usuarioId)
    this.email = (await this.authService.getAuth().currentUser).email;
    //console.log(this.usuarioId + this.email);
    this.usuarioSubscription = this.usuarioService.getUsuarios().subscribe(data => {
      
      for (let x = 0; x < data.length; x++) {
        //console.log(data[x].id +" - "+this.usuarioId);
        if (data[x].id == this.usuarioId) {
          this.usuario = data[x];
          this.usuarios = data[x];
          this.Iduser = data[x].id;
          //this.pacientes = data[x];
          //console.log(this.usuarios.id+ " -+ " )
        } else {
          this.usuarios.email = this.email;
          //console.log(this.usuarioId + this.email);
        }
      }
    });
    //if (this.userId) this.loadUsuario();
  }

  async saveUsuario() {
    await this.presentLoading();

    //this.medico.id = (await this.authService.getAuth().currentUser).uid;

    if (this.usuarios.id) {
      try {
        this.usuarios.tipoUsuario = '4';
        await this.usuarioService.updateUsuario(this.usuarios.id, this.usuarios);
        await this.loading.dismiss();
        //console.log("update" + this.usuarios)
        this.presentToast('Usuario Atualizado');
        //this.navCtrl.navigateBack('/listclinicas');
      } catch (error) {
        //console.log("não update" + this.usuarios)
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.medico.createdAt = new Date().getTime();

      try {
        //this.usuario.email = this.userEmail
        this.usuarios.tipoUsuario = '4';
        this.usuarios.id = this.usuarioId;
        await this.usuarioService.addUsuario(this.usuarios.id, this.usuarios);
        await this.loading.dismiss();
       // console.log("salvou" + this.usuarios)
        this.presentToast('Usuário salvo');
        //this.navCtrl.navigateBack('/listclinicas');
      } catch (error) {
       // console.log("não salvou " + this.usuarios)
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 3000 });
    toast.present();
  }

}
