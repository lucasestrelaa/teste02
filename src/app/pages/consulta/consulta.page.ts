import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Clinicas } from 'src/app/interfaces/clinicas';
import { Consulta } from 'src/app/interfaces/consulta';
import { Especialidades } from 'src/app/interfaces/especialidades';
import { Medicos } from 'src/app/interfaces/medicos';
import { Uf } from 'src/app/interfaces/uf';
import { AuthService } from 'src/app/services/auth.service';
import { ClinicasService } from 'src/app/services/clinicas.service';
import { DependentesService } from 'src/app/services/dependentes.service';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { UfService } from 'src/app/services/uf.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {
  private consultaId: string = null;
  public consulta: Consulta = {};
  public consultas = new Array<Consulta>();
  private consultasSubscription: Subscription;

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
    //private usuarioService: AuthService,
    //dependente
    private dependenteService: DependentesService,
    //especialidade
    private especialidadeService: EspecialidadeService,
    //medico
    private medicoService: MedicosService,
    //clinica
    private clinicaService: ClinicasService,


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
    //Paciente
    // this.PacienteSubscription = this.pacientesService.getPacientes().subscribe(data => {
    //   this.pacientes = data;
    // });
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
    

    //if (this.consultaId) this.loadMedico();
  }

  ngOnInit() {
  }

  //Paciente
  //dependente
  //especialidade
  //medico
  //clinica
  //uf

}
