import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Dependentes } from 'src/app/interfaces/dependentes';
import { Orgaoemissor } from 'src/app/interfaces/orgaoemissor';
import { Uf } from 'src/app/interfaces/uf';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { DependentesService } from 'src/app/services/dependentes.service';
import { OrgaoemissorService } from 'src/app/services/orgaoemissor.service';
import { UfService } from 'src/app/services/uf.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dependente',
  templateUrl: './dependente.page.html',
  styleUrls: ['./dependente.page.scss'],
})
export class DependentePage implements OnInit {
  private usuarioId: string = null;
  private dependenteId: string = null;
  public dependente: Dependentes = {};
  public dependentes: Dependentes = {};
  private dependenteSubscription: Subscription;

  //usuario
  public usuario: User = {};
  public usuarios: User = {};
  private usuarioSubscription: Subscription;
  private Iduser: string;
  private email: string;
  public userEmail: string;


  //Orgao emissor
  public orgaosemissores = new Array<Orgaoemissor>();
  private orgaoemissorSubscription: Subscription;

  //Uf
  public ufs = new Array<Uf>();
  private ufSubscription: Subscription;


  private loading: any;
  constructor(
    private dependenteService: DependentesService,
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
    this.dependenteId = this.activatedRoute.snapshot.params['id'];

    this.loadUsuario();

    this.ufSubscription = this.ufService.getUfs().subscribe(data => {
      this.ufs = data;
    });
    this.orgaoemissorSubscription = this.orgaoemissorService.getOrgaoemissores().subscribe(data => {
      this.orgaosemissores = data;
    });
    if (this.dependenteId) this.loadDependente();
  }

  ngOnInit() {
  }

  async loadUsuario() {
    console.log("loadUser");

    //ver porque está chegando vazio o authservice
    this.usuarioId = (await this.authService.getAuth().currentUser).uid;
    console.log(this.usuarioId + " - 123")
    //this.dependente.idtitular = this.usuarioId;
    //console.log(this.userEmail + this.email)
    this.usuarioSubscription = this.usuarioService.getUsuario(this.usuarioId).subscribe(data => {
      if(this.dependente.idtitular != data.id){
        this.usuario = data;
        this.dependente.idtitular = data.id;
      }
      // for (let x = 0; x < data.length; x++) {
      //   if (data[x].id == this.usuarioId) {
      //     this.usuario = data[x];
      //     this.usuarios = data[x];
      //     this.Iduser = data[x].id;
      //     //console.log(this.usuarios.profissao+ " " + this.usuarios.id)
      //   } else {
      //     this.dependente.email = this.email;
      //     this.dependente.idtitular = this.usuarioId;
      //     //this.dependente.idtitular = this.usuarioId;
      //     //this.usuarios.id = this.userId;
      //     //console.log(this.usuarios.phoneNumber + this.usuarios.id + "13")
      //   }
      // }
    });
    //if (this.userId) this.loadUsuario();
  }
  voltar(){
    this.route.navigate(['/listdependentes']);
  }
  async loadDependente() {
    console.log("teste" + this.dependenteId);
    this.dependenteSubscription = this.dependenteService.getDependente(this.dependenteId).subscribe(data => {
      this.dependente = data;
      //console.log(data + "Medico data")
    });
  }
  async saveDependente() {
    await this.presentLoading();

    //this.medico.id = (await this.authService.getAuth().currentUser).uid;

    if (this.dependenteId) {
      try {
        await this.dependenteService.updateDependente(this.dependenteId, this.dependente);
        await this.loading.dismiss();
        console.log("update" + this.dependente)
        this.presentToast('Dependente Atualizado');
        //this.navCtrl.navigateBack('/listclinicas');
      } catch (error) {
        console.log("não update" + this.dependente)
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      //this.medico.createdAt = new Date().getTime();

      try {
        //this.dependente.email = this.userEmail
        //this.usuario.id = this.usuarioId;
        await this.dependenteService.addDependente(this.dependente);
        await this.loading.dismiss();
        console.log("salvou" + this.dependente)
        this.presentToast('Usuário salvo');
        //this.navCtrl.navigateBack('/listclinicas');
      } catch (error) {
        console.log("não salvou " + this.dependente)
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
