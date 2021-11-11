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
  selector: 'app-listdependentes',
  templateUrl: './listdependentes.page.html',
  styleUrls: ['./listdependentes.page.scss'],
})
export class ListdependentesPage implements OnInit {
  private userId: string;
  public user: User = {};
  public usuarios: User = {};
  private Iduser: string;

  private dependenteId: string;
  private idTitular: string;
  public dependente: Dependentes = {};
  public dependentes = new Array<Dependentes>();
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

    this.dependenteSubscription = this.dependentesService.getDependentes().subscribe(data => {

      this.dependentes = data;
      let countDependentes = this.dependentes.length;
      for (let x = 0; x > countDependentes; x++) {
        if (this.userId == this.dependentes[x].idTitular) {
          this.dependente = this.dependentes[x];
        }
      }
    });
  }

  ngOnInit() {
  }
  async getUser() {
    this.userId = (await this.authService.getAuth().currentUser).uid;
    this.email = (await this.authService.getAuth().currentUser).email;
    console.log('email: ' + this.email)

    this.userSubscription = this.usuarioService.getUsuarios().subscribe(data => {
      console.log(data.length)
      if (data.length > 0) {
        for (let x = 0; x < data.length; x++) {
          console.log(data[x].id + "-" + this.userId)
          if (data[x].id === this.userId) {
            this.user = data[x];
            this.usuarios = data[x];
            this.Iduser = data[x].id;
          } else {
            console.log('email');
            this.usuarios.email = this.email;
          }
        }
      } else {
        this.usuarios.email = this.email;
      }

    });
    //if (this.userId) this.loadUsuario();
  }

}
