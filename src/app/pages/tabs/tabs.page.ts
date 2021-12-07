import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  private usuarioId: string;
  public usuario: User = {};
  public usuarios: User = {};
  public pacientes: {};
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
    this.usuarioId = (await this.authService.getAuth().currentUser).uid;
    this.email = (await this.authService.getAuth().currentUser).email;
    this.usuarioSubscription = this.usuarioService.getUsuarios().subscribe(data => {
      
      for (let x = 0; x < data.length; x++) {
        //console.log(data[x].id +" - "+this.usuarioId);
        if (data[x].id == this.usuarioId) {
          this.usuario = data[x];
          this.usuarios = data[x];
          this.Iduser = data[x].id;
          // this.pacientes = data[x];

          //console.log(this.usuarios.tipoUsuario+ " -+ " )
        } else {
          this.usuarios.email = this.email;
          //console.log(this.usuarioId + this.email);
        }
      }
    });
    //if (this.userId) this.loadUsuario();
  }

}
