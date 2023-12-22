import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  // params
  connected : boolean = false;
  role : 'admin'|'formateur'|'candidat'|undefined = undefined;
  nom ?: string;

  constructor() { }

  controle(){
    if(sessionStorage.getItem('accessToken') && sessionStorage.getItem('user') ){
      this.role = JSON.parse(sessionStorage.getItem("user")!).role;
      this.nom = JSON.parse(sessionStorage.getItem("user")!).nom;
      this.connected = true;
      return true;
    }
    else{
      this.connected = false;
      return false
    }
  }

  userRole(){
    if(this.controle()){
      return this.role;
    }
    return undefined;
  }




  deconnexion(){
    sessionStorage.clear();
    this.controle();
  }

}
