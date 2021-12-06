import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from './interfaces/user';
import { AuthService } from './services/auth.service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private usuarioId: string;
  public usuario: User = {};
  public usuarios: User = {};
  private Iduser: string;
  private email: string;
  public userEmail: string;
  private usuarioSubscription: Subscription;
  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
  ) {
    this.loadUsuario();
  }
  async loadUsuario() {
    //this.phoneNumber = (await this.authService.getAuth().currentUser).phoneNumber;
    //this.user.phoneNumber =  (await this.authService.getAuth().currentUser).phoneNumber;
    this.usuarioId = (await this.authService.getAuth().currentUser).uid;
    this.email = (await this.authService.getAuth().currentUser).email;
    //console.log(this.usuarioId + this.email);
    this.usuarioSubscription = this.usuarioService.getUsuarios().subscribe(data => {
      
      for (let x = 0; x < data.length; x++) {
        console.log(data[x].id +" - "+this.usuarioId);
        if (data[x].id == this.usuarioId) {
          this.usuario = data[x];
          this.usuarios = data[x];
          this.Iduser = data[x].id;
          //this.pacientes = data[x];
          console.log(this.usuarios.id+ " -+ " )
        } else {
          this.usuarios.email = this.email;
          console.log(this.usuarioId + this.email);
        }
      }
    });
    //if (this.userId) this.loadUsuario();
  }
  
}
