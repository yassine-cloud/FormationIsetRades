import { Component, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Formation } from 'src/app/Interfaces/formation';
import { FormationService } from 'src/app/Services/formation.service';

@Component({
  selector: 'app-afficher-formation',
  templateUrl: './afficher-formation.component.html',
  styleUrls: ['./afficher-formation.component.css']
})
export class AfficherFormationComponent {

  constructor(private formationServ : FormationService){}
  formations !: Formation[] ;
  formationDetail !:Formation ;

  


  // pop up view
  private modalService = inject(NgbModal);

  openPopup(content : TemplateRef<any>){
    this.modalService.open(content , {backdropClass : 'pop-up-backdrop' })
  }

  //////////////////////////////////////////////////////////////////
  ngOnInit(): void {

    this.formationServ.getFormations().subscribe(
      {next : (formations) =>  { this.formations = formations  } }
    )
      
  }

  opendetail(content: TemplateRef<any> , formation : Formation){
    this.formationDetail = formation;
    this.openPopup(content);
  }


  // supprimer(){

  //   this.formationServ.(this.formationDetail.id!).subscribe(
  //     {next : () => {
  //       this.ngOnInit();
  //       this.modalService.dismissAll();
  //     }}
  //   )

  // }

}
