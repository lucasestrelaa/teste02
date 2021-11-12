import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Dependentes } from 'src/app/interfaces/dependentes';
import { Uf } from 'src/app/interfaces/uf';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { DependentesService } from 'src/app/services/dependentes.service';
import { UfService } from 'src/app/services/uf.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dependente',
  templateUrl: './dependente.page.html',
  styleUrls: ['./dependente.page.scss'],
})
export class DependentePage implements OnInit {
  private userId: string;
  public user: User = {};
  public usuarios: User = {};
  private Iduser: string;

  private dependenteId: string;
  private idTitular: string;
  public dependente: Dependentes = {};
  public dependentes: Dependentes = {};
  private Iddependente: string;

  private email: string;

  public ufs = new Array<Uf>();

  private dependenteSubscription: Subscription;
  private userSubscription: Subscription;
  private UfSubscription: Subscription;
  private loading: any;

  constructor(
    private authService: AuthService,
    private dependentesService: DependentesService,
    private usuarioService: UsuarioService,
    private ufService: UfService,

    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
  ) {
    this.getUser();

    this.getDependentes();

    this.UfSubscription = this.ufService.getUfs().subscribe(data => {
      this.ufs = data;
    });
  }

  ngOnInit() {
  }
  async getUser() {
    this.userId = (await this.authService.getAuth().currentUser).uid;
    //this.email = (await this.authService.getAuth().currentUser).email;
    //console.log('email: ' + this.email)

    this.userSubscription = this.usuarioService.getUsuarios().subscribe(data => {
      console.log(data.length)
      if (data.length > 0) {
        for (let x = 0; x < data.length; x++) {
          console.log(data[x].id + "-" + this.userId)
          if (data[x].id === this.userId) {
            this.user = data[x];
            this.usuarios = data[x];
            this.Iduser = data[x].id;
          }
        }
      }

    });
    //if (this.userId) this.loadUsuario();
  }

  async getDependentes() {
    this.userId = (await this.authService.getAuth().currentUser).uid;
    this.dependentes.idTitular = this.userId;
    console.log('email: ' + this.email)

    this.dependenteSubscription = this.dependentesService.getDependentes().subscribe(data => {
      console.log(data.length)
      if (data.length > 0) {
        for (let x = 0; x < data.length; x++) {
          console.log(data[x].id + "-" + this.userId)
          if (data[x].id === this.userId) {
            this.dependente = data[x];
            this.dependentes = data[x];
            this.Iddependente = data[x].id;
          } else {
            //console.log('email');
            this.dependentes.idTitular = this.dependentes.idTitular;
          }
        }
      } else {
        this.dependentes.idTitular = this.dependentes.idTitular;
      }

    });

  }
  async salvarDependente() {

    await this.presentLoading();
    //this.user.id = (await this.authService.getAuth().currentUser).uid;
    //console.log((await this.authService.getAuth().currentUser).email);
    //console.log(this.usuarios.id+" asnfogunasfognaosignosmgasdg")
    if (this.dependentes.id ) {
      //console.log(this.usuarios + " 1234");
      //console.log(this.Iduser + " 1234")
      try {
        //console.log(this.usuarios);
        //console.log(this.Iduser);
        //usuarios
        // 1 = Adm || 2 = criador de enquetes || 3 = usuario simples
        if (!this.dependentes.tipoUser) {
          setTimeout(await this.loading.dismiss(), 3000);
          if (!this.dependentes.tipoUser) {
            this.dependentes.tipoUser = 5;
          }
        } else {

        }

        await this.dependentesService.updateDependente(this.dependentes.id, this.dependentes);
        await this.loading.dismiss();
        this.presentToast('Dependente salvo!');
        //this.navCtrl.navigateBack('/home');
      } catch (error) {
        console.log(error)
        this.presentToast('Erro ao tentar salvar!');
        this.loading.dismiss();
      }
    } else {
      //this.user.data = new Date().getTime();

      try {
        this.dependentes.tipoUser = 3;
        this.dependentes.idTitular = (await this.authService.getAuth().currentUser).uid;
        await this.dependentesService.addDependente(this.dependentes.id, this.dependente);
        await this.loading.dismiss();

        //this.navCtrl.navigateBack('/');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar!');
        this.loading.dismiss();
      }
    }

  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor aguarde!' });
    return this.loading.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
