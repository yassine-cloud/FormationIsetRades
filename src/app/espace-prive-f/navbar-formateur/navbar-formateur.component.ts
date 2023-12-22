import { Component, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConnexionService } from 'src/app/Services/connexion.service';

@Component({
  selector: 'app-navbar-formateur',
  templateUrl: './navbar-formateur.component.html',
  styleUrls: ['./navbar-formateur.component.css']
})
export class NavbarFormateurComponent {

  userName ?:string ;

  constructor(private conn : ConnexionService , private router : Router){}



  // pop up view
private modalService = inject(NgbModal);

openPopup(content : TemplateRef<any>){
  this.modalService.open(content , {backdropClass : 'pop-up-backdrop' })
}

deconnexion(){
  this.conn.deconnexion();
  this.modalService.dismissAll("deconnecter ");
  this.router.navigate(["/"]);
}

//////////////////////////////////////////////////////////////////


ngOnInit(): void {
  this.userName=this.conn.nom;    
}

}
