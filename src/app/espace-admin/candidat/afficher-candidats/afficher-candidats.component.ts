import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Candidat } from 'src/app/Interfaces/candidat';
import { CandidatService } from 'src/app/Services/candidat.service';

@Component({
  selector: 'app-afficher-candidats',
  templateUrl: './afficher-candidats.component.html',
  styleUrls: ['./afficher-candidats.component.css']
})
export class AfficherCandidatsComponent implements OnInit {


  constructor(private candidatServ : CandidatService){}
  candidats !: Candidat[] ;
  candidatDetail !:Candidat ;

  
  // pop up view
  private modalService = inject(NgbModal);

  openPopup(content : TemplateRef<any>){
    this.modalService.open(content , {backdropClass : 'pop-up-backdrop' })
  }

  //////////////////////////////////////////////////////////////////

  ngOnInit(): void {

    this.candidatServ.getAllCandidats().subscribe(
      {next : (candidats) =>  { this.candidats = candidats  } }
    )
      
  }

  opendetail(content: TemplateRef<any> , candidat : Candidat){
    this.candidatDetail = candidat;
    this.openPopup(content);
  }


  supprimer(){

    this.candidatServ.deleteCandidat(this.candidatDetail.id!).subscribe(
      {next : () => {
        this.ngOnInit();
        this.modalService.dismissAll();
      }}
    )

  }



}
