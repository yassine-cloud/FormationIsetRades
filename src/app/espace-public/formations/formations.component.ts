import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Formation } from 'src/app/Interfaces/formation';
import { FormationDemandeService } from 'src/app/Services/formation-demande.service';
import { FormationService } from 'src/app/Services/formation.service';


@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {

  // parametre
  formations : Formation[] = [];
  formationsFiltered : Formation[]= [];


  motCle : string = "" ;

  demandeEnvoyeEchec : boolean =false;demandeEnvoyeSuccess : boolean =false;
  message !: { type : string , message : string}


    // formulaire de la demande

    formulaire = this.formBuilder.group(
      {

        objet : ["" , Validators.required]  ,
        explication : ["", Validators.required]
      }
    )



  // pop up view
  private modalService = inject(NgbModal);

  openPopup(content : TemplateRef<any>){
    this.modalService.open(content , {  backdropClass : 'pop-up-backdrop' })
  }
  //////////////////////////////////////////////////////////////////

  constructor (private formationServ : FormationService , private formationDemServ : FormationDemandeService , private formBuilder : FormBuilder){}

  ngOnInit(): void {
      this.formationServ.getFormations().subscribe(
        (formations)=>{
          this.formations = formations;
          this.formationsFiltered = formations;
        }
      )
  }


  // search avec le cle
  formationsSearched(){
    this.formationsFiltered = this.formations.filter( (formation) => formation.motsCles.some( m => m.toUpperCase().includes(this.motCle.toUpperCase()) ) )
  }


  // envoyer une demande
  envoyerDemande(){

    this.formationDemServ.demander(
      {
        objet : this.formulaire.value.objet!,
        explication : this.formulaire.value.explication!
      } 
    ).subscribe(
      isSend => {
        this.modalService.dismissAll();
        this.formulaire.reset();
        if(isSend){
           
            this.demandeEnvoyeSuccess = true;
          setTimeout(() => {
            this.demandeEnvoyeSuccess = false; // apres 5 sec
          }, 5000);
          
        }
        else{
          this.demandeEnvoyeEchec = true;
          setTimeout(() => {
            this.demandeEnvoyeEchec = false; //apres 5 sec            
          }, 5000);
          
          
        }
      }
    )
  }

  

}
