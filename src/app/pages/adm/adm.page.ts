import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.page.html',
  styleUrls: ['./adm.page.scss'],
})
export class AdmPage implements OnInit {

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
    
  }
  voltar(){
    this.route.navigate(['/tabs']);
  }

}