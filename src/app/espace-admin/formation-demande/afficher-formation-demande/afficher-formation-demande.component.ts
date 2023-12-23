import { Component, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationDemande } from 'src/app/Interfaces/formation';
import { FormationDemandeService } from 'src/app/Services/formation-demande.service';

@Component({
  selector: 'app-afficher-formation-demande',
  templateUrl: './afficher-formation-demande.component.html',
  styleUrls: ['./afficher-formation-demande.component.css']
})
export class AfficherFormationDemandeComponent {

  constructor(private formationDemandeServ : FormationDemandeService){}
  formations !: FormationDemande[] ;
  formationDetail !:FormationDemande ;

  


  // pop up view
  private modalService = inject(NgbModal);

  openPopup(content : TemplateRef<any>){
    this.modalService.open(content , {backdropClass : 'pop-up-backdrop' })
  }

  //////////////////////////////////////////////////////////////////
  ngOnInit(): void {

    this.formationDemandeServ.getAllDemande().subscribe(
      {next : (formations) =>  { this.formations = formations  } }
    )
      
  }

  opendetail(content: TemplateRef<any> , formation : FormationDemande){
    this.formationDetail = formation;
    this.openPopup(content);
  }


  supprimer(){

    this.formationDemandeServ.supprimerDemande(this.formationDetail).subscribe(
      {next : () => {
        this.ngOnInit();
        this.modalService.dismissAll();
      }}
    )

  }


}
