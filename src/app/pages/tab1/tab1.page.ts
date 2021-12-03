import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Clinicas } from 'src/app/interfaces/clinicas';
import { Consulta } from 'src/app/interfaces/consulta';
import { Dependentes } from 'src/app/interfaces/dependentes';
import { Especialidades } from 'src/app/interfaces/especialidades';
import { Medicos } from 'src/app/interfaces/medicos';
import { Uf } from 'src/app/interfaces/uf';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ClinicasService } from 'src/app/services/clinicas.service';
import { ConsultaService } from 'src/app/services/consulta.service';
import { DependentesService } from 'src/app/services/dependentes.service';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { UfService } from 'src/app/services/uf.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private loading: any;
  public consultas = new Array<Consulta>();
  public consultasPaciente = new Array<Consulta>();
  private consultaSubscription: Subscription;
  public dependenteConf = false;
  //Paciente
  private usuarioId: string;
  public usuario: User = {};
  public usuarios = new Array<User>();
  private userId: string ;
  public user: User = {};
  private usuarioSubscription: Subscription;
  public dependentes = new Array<Dependentes>();
  private dependenteId: string = null;
  public dependente: Dependentes = {};
  private dependenteSubscription: Subscription;

  public paciente = {};



  //Medico
  public medicos = new Array<Medicos>();
  private medicoId: string = null;
  public medico: Medicos = {};
  //Clinicas
  public clinicas = new Array<Clinicas>();
  private clinicaId: string = null;
  public clinica: Clinicas = {};
  private clinicaSubscription: Subscription;

  //UF
  public ufs = new Array<Uf>();
  private UfSubscription: Subscription;

  //Especialidade
  public especialidades = new Array<Especialidades>();
  private EspecialidadesSubscription: Subscription;
  //Consulta

  //public especialidades = new Array<Especialidades>();


  //private loading: any;
  private medicoSubscription: Subscription;

  
  constructor(
    //paciente
    //usuario
    private usuarioService: UsuarioService,
    //dependente
    private dependenteService: DependentesService,

    //especialidade
    private especialidadeService: EspecialidadeService,
    //medico
    private medicoService: MedicosService,
    //clinica
    private clinicaService: ClinicasService,

    //consulta
    //private consultaService: ConsultaService,

    //Uf
    private ufService: UfService,


    private activatedRoute: ActivatedRoute,
    //private route: Router,
    private navCtrl: NavController,
    //private loadingCtrl: LoadingController,
    //private authService: AuthService,
    //private toastCtrl: ToastController
    private authService: AuthService,
    private route: Router,
    private loadingCtrl: LoadingController,
    private consultaService: ConsultaService,
    private toastCtrl: ToastController
  ) {
    this.loadUsuario();
    this.consultaSubscription = this.consultaService.getConsultas().subscribe(data => {
      this.consultas.pop();
      for(let i = 0; i < data.length; i++){
        
        console.log(this.userId + " - "+ data[i].idPaciente)
        if(data[i].idPaciente != null){
          //console.log(this.userId + " - "+ data[i].idPaciente)
          //console.log(data[i])
          this.consultas.push(data[i]);
          //puxar dados
          this.getDependente(data[i].idPaciente);
          this.getMedico(data[i].idMedico);
          this.getClinica(data[i].idClinica);
        }
        
      }
      //this.consultas = data;
    });
    this.EspecialidadesSubscription = this.especialidadeService.getEspecialidades().subscribe(data => {
      this.especialidades = data;
    });
    //medico
    this.medicoSubscription = this.medicoService.getMedicos().subscribe(data => {
      this.medicos = data;
    });
    //medico
    this.clinicaSubscription = this.clinicaService.getClinicas().subscribe(data => {
      this.clinicas = data;
    });
    //uf
    this.UfSubscription = this.ufService.getUfs().subscribe(data => {
      this.ufs = data;
    });
    this.EspecialidadesSubscription = this.especialidadeService.getEspecialidades().subscribe(data => {
      this.especialidades = data;
    });
    this.usuarioSubscription = this.usuarioService.getUsuarios().subscribe(data => {
      // for(let i = 0; i < data.length; i++){
      //   if(data[i].id == this.userId){
      //     //console.log(data[i].id)
      //     this.usuarios = data;
      //     this.paciente = data;
      //     console.log(this.usuarios. + "usuario")
      //   }
      // }
      data.map((arr)=>{
        if(arr.id == this.userId){
          this.usuarios = data;
          //this.paciente = data;
        }
      })
      
      //console.log(data + "usuario")
    });
    this.dependenteSubscription = this.dependenteService.getDependentes().subscribe(data => {
      // for(let i = 0; i < data.length; i++){
      //   if(data[i].id == this.userId){
      //     //console.log(data[i].id)
      //     this.paciente = data;
      //     console.log(this.paciente + "usuario")
      //   }
      // }
      
      data.map((arr)=>{
        //console.log(arr.idtitular +" - "+ this.userId)
        if(arr.idtitular == this.userId){
          //console.log(arr.id +" - "+ this.userId)
          //this.usuarios = arr;
          //this.paciente = arr;
          //console.log(this.paciente + " paciente")
        }
      })
      
    });
    //if (this.consultaId) this.loadConsulta();

  }
  ngOnDestroy() {
    this.consultaSubscription.unsubscribe();
  }
  async loadUsuario() {
    //this.phoneNumber = (await this.authService.getAuth().currentUser).phoneNumber;
    //this.user.phoneNumber =  (await this.authService.getAuth().currentUser).phoneNumber;
    this.userId = (await this.authService.getAuth().currentUser).uid;
    console.log(this.userId)
    //this.email = (await this.authService.getAuth().currentUser).email;
    //console.log(this.userEmail + this.email)
    this.usuarioSubscription = this.usuarioService.getUsuarios().subscribe(data => {
      for (let x = 0; x < data.length; x++) {
        
        if (data[x].id == this.userId) {
          this.usuario = data[x];
          //console.log(data[x].id + " - "+this.userId)
          //this.usuarios = data[x];
          //this.Iduser = data[x].id;
          //this.pacientes = data[x];
          //console.log(this.usuarios.profissao+ " " + this.usuarios.id)
        } else {
          //this.usuarios.email = this.email;
          //this.usuarios.id = this.userId;
          //console.log(this.usuarios.phoneNumber + this.usuarios.id + "13")
        }
      }
    });
    //if (this.userId) this.loadUsuario();
  }

  async deleteConsulta(id: string) {
    try {
      await this.consultaService.deleteConsulta(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }
  getDependente(idDependente){
    console.log(idDependente + ": Dependente")
    this.dependenteSubscription = this.dependenteService.getDependente(idDependente).subscribe(data => {
      //console.log(data + ": dependente");
      if(data != null){
        console.log("dependente")
        this.usuario = data
        this.dependenteConf = true;
        //console.log(this.dependenteConf)
      }else{
        this.getUsuario(idDependente)
        this.dependenteConf = false;
        //console.log(this.dependenteConf)
      }
      
    })
  }
  getUsuario(idUsuario){
    this.usuarioSubscription = this.usuarioService.getUsuario(idUsuario).subscribe(data => {
      this.usuario = data
    })
  }
  getMedico(idMedico){
    this.medicoSubscription = this.medicoService.getMedico(idMedico).subscribe(data => {
      this.medico = data
      //console.log(this.medico)
    })
  }
  getClinica(idClinica){
    this.clinicaSubscription = this.clinicaService.getClinica(idClinica).subscribe(data => {
      this.clinica = data
      //console.log(this.clinica)
    })
  }

  voltar(){
    this.route.navigate(['/adm']);
  }
  doRefresh(event) {
    //console.log('Begin async operation');
    window.location.reload()
    setTimeout(() => {
      //console.log('Async operation has ended');
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
