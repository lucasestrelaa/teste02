import { Component } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
//import { GeolocationOriginal } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map: any;
  startPosition: any;
  originPosition: string;
  destinationPosition: string;
  constructor(
    private authService: AuthService,
    public actionSheetController: ActionSheetController,
    private navCtrl: NavController,
  ) {
    // let locale = this.geolocation.watchPosition((res) => {
    //   console.log(res)
    // });
  }

  ionViewDidLoad() {
    this.initializeMap();
  }

  initializeMap() {
    this.startPosition = new google.maps.LatLng(-21.763409, -43.349034);

    const mapOptions = {
      zoom: 18,
      center: this.startPosition,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.directionsDisplay.setMap(this.map);

    const marker = new google.maps.Marker({
      position: this.startPosition,
      map: this.map,
    });
  }
  calculateRoute() {
    if (this.destinationPosition && this.originPosition) {
      const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: this.originPosition,
        destination: this.destinationPosition,
        travelMode: 'DRIVING'
      };

      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
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
