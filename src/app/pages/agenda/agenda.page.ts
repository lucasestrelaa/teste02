import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  constructor(
    private authService: AuthService,
    public actionSheetController: ActionSheetController,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }
  async sair() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.log(error)
    } finally {
      //this.loading.;
    }
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Menu',
      buttons: [{
        text: 'Logout',
        icon: 'log-out-outline',
        handler: () => {
          this.authService.logout();
          console.log('Share clicked');
        }
      },{
        text: 'Perfil',
        icon: 'person-outline',
        handler: () => {
          this.navCtrl.navigateRoot('/tabs/tab5');
          console.log('/tabs/tab5');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
