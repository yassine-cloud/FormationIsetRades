import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Formateur } from 'src/app/Interfaces/formateur';
import { FormateurService } from 'src/app/Services/formateur.service';

@Component({
  selector: 'app-afficher-formateur',
  templateUrl: './afficher-formateur.component.html',
  styleUrls: ['./afficher-formateur.component.css']
})
export class AfficherFormateurComponent implements OnInit {

  
  constructor(private formateurServ : FormateurService){}
  formateurs !: Formateur[] ;
  formateurDetail !:Formateur ;


// pop up view
private modalService = inject(NgbModal);

openPopup(content : TemplateRef<any>){
  this.modalService.open(content , {backdropClass : 'pop-up-backdrop' })
}

//////////////////////////////////////////////////////////////////



ngOnInit(): void {

  this.formateurServ.getAllFormateurs().subscribe(
    {next : (formateurs) =>  { this.formateurs = formateurs  } }
  )
    
}

opendetail(content: TemplateRef<any> , formateur : Formateur){
  this.formateurDetail = formateur;
  this.openPopup(content);
}


supprimer(){

  this.formateurServ.deleteFormateur(this.formateurDetail.id!).subscribe(
    {next : () => {
      this.ngOnInit();
      this.modalService.dismissAll();
    }}
  )

}










}
