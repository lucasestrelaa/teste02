import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  cadastro(){
    this.route.navigate(['/cadastro']);
  }
  login(){
    this.route.navigate(['/login']);
  }

}
