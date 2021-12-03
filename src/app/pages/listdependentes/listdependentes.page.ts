import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Dependentes } from 'src/app/interfaces/dependentes';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ClinicasService } from 'src/app/services/clinicas.service';
import { DependentesService } from 'src/app/services/dependentes.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listdependentes',
  templateUrl: './listdependentes.page.html',
  styleUrls: ['./listdependentes.page.scss'],
})
export class ListdependentesPage implements OnInit {

  private usuarioId: string;
  private dependenteId: string = null;
  //public dependente: Dependentes = {};
  public usuario: User = {};
  public usuarios: User = {};
  private usuarioSubscription: Subscription;
  private Iduser: string;

  private loading: any;
  public dependentes = new Array<Dependentes>();
  private dependentesSubscription: Subscription;
  dependente: { };
  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private route: Router,
    private loadingCtrl: LoadingController,
    private dependenteService: DependentesService,
    private toastCtrl: ToastController
  ) {
    this.loadUsuario();
    this.dependentes.pop();
    this.dependentesSubscription = this.dependenteService.getDependentes().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if(this.usuarioId == data[i].idtitular){
          console.log("igual")
          this.dependentes.push(data[i]);
        } 
      }
        
      // console.log(this.usuarioId +" teste recupera dependente" + data)
      // for(let i = 0; i > data.length; i++){
      //   //console.log(this.usuarioId +" teste recupera dependente" + data[i].idtitular)
      //   if(this.usuarioId == data[i].idtitular){
      //     console.log(this.usuarioId + " - "+ data[i].idtitular)
      //     this.dependentes = data;
      //   }
      // }
      //this.dependentes = data;
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.dependentesSubscription.unsubscribe();
  }

  async deleteDependente(id: string) {
    try {
      await this.dependenteService.deleteDependente(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  voltar() {
    this.route.navigate(['/tabs/tab5']);
  }
  async loadUsuario() {
    console.log("loadUser");

    //ver porque está chegando vazio o authservice
    this.usuarioId = (await this.authService.getAuth().currentUser).uid;
    //this.dependente.idtitular = this.usuarioId;
    
    // this.usuarioSubscription = this.usuarioService.getUsuarios().subscribe(data => {
    //   for (let x = 0; x < data.length; x++) {
    //     if (data[x].id == this.usuarioId) {
    //       this.usuario = data[x];
    //       this.usuarios = data[x];
    //       this.Iduser = data[x].id;
    //       //console.log(this.usuarios.profissao+ " " + this.usuarios.id)
    //     } else {
    //       //this.usuarios.email = this.email;
    //       //this.dependente.idtitular = this.usuarioId;
    //       //this.usuarios.id = this.userId;
    //       //console.log(this.usuarios.phoneNumber + this.usuarios.id + "13")
    //     }
    //   }
    // });
    //if (this.userId) this.loadUsuario();
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

}
