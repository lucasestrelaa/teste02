import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { element } from 'protractor';
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
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {
  //
 
  //public usuarios: User = {};

  //
  private consultaId: string = null;
  public consulta: Consulta = {};
  public consultas = new Array<Consulta>();
  private consultasSubscription: Subscription;

  //Paciente
  private usuarioId: string = null;
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


  private loading: any;
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
    private consultaService: ConsultaService,

    //Uf
    private ufService: UfService,


    private activatedRoute: ActivatedRoute,
    private route: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.consultaId = this.activatedRoute.snapshot.params['id'];
    this.loadUsuario();
    //Paciente
    
    //console.log(this.paciente)
    //Dependente
    // this.DependentesSubscription = this.dependenteService.getDependentes().subscribe(data => {
    //   this.dependentes = data;
    // });
    //especialidade
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
    this.usuarios.pop();
    this.usuarioSubscription = this.usuarioService.getUsuarios().subscribe(data => {
      console.log(this.userId)
      data.map((arr)=>{
        if(arr.id == this.userId){
          this.usuarios.push(arr);
        }
      })
    });
    this.dependenteSubscription = this.dependenteService.getDependentes().subscribe(data => {
      
      data.map((arr)=>{
        if(arr.idtitular != null && arr.idtitular == this.userId){
          console.log(arr.idtitular +" - "+ this.userId + " :dependente")
          this.usuarios.push(arr)
          console.log(this.usuarios + " :paciente")
        }
      })
    });
    if (this.consultaId) this.loadConsulta();
  }

  ngOnInit() {
  }
  loadConsulta() {
    
    this.consultasSubscription = this.consultaService.getConsulta(this.consultaId).subscribe(data => {
      this.consulta = data;
    });
  }
  async loadUsuario() {
    //this.phoneNumber = (await this.authService.getAuth().currentUser).phoneNumber;
    //this.user.phoneNumber =  (await this.authService.getAuth().currentUser).phoneNumber;
    this.userId = (await this.authService.getAuth().currentUser).uid;
    //console.log(this.userId)
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

  //Paciente
  //dependente
  //especialidade
  //medico
  //clinica
  //uf
  async saveConsulta() {
    await this.presentLoading();
    if (this.consultaId) {
      try {
        this.usuarios.map((arr)=>{
          if(this.consulta.idPaciente == arr.id){
            this.consulta.nomePaciente = arr.nome;
            console.log(arr.nome)
          }
          if(arr.tipoUsuario == '4'){
            this.consulta.dependente = true;
          }else{
            this.consulta.dependente = false;
          }
        })
        
        await this.consultaService.updateConsulta(this.consultaId, this.consulta);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/tabs/tab1');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {

      try {
        this.usuarios.map((arr)=>{
          if(this.consulta.idPaciente == arr.id){
            this.consulta.nomePaciente = arr.nome;
          }
          if(arr.tipoUsuario == '4'){
            this.consulta.dependente = true;
          }else{
            this.consulta.dependente = false;
          }
          
        })
        await this.consultaService.addConsulta(this.consulta);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/tabs/tab1');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }

  }
  voltar(){
    this.route.navigate(['/tabs/tab1']);
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
