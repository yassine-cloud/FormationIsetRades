import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Candidat } from 'src/app/Interfaces/candidat';
import { Formateur } from 'src/app/Interfaces/formateur';
import { Formation } from 'src/app/Interfaces/formation';
import { Session, SessionToRead } from 'src/app/Interfaces/session';
import { CandidatService } from 'src/app/Services/candidat.service';
import { FormateurService } from 'src/app/Services/formateur.service';
import { FormationService } from 'src/app/Services/formation.service';
import { SessionService } from 'src/app/Services/session.service';

@Component({
  selector: 'app-afficher-session-formation',
  templateUrl: './afficher-session-formation.component.html',
  styleUrls: ['./afficher-session-formation.component.css']
})
export class AfficherSessionFormationComponent implements OnInit {

  constructor(
    private candidatServ : CandidatService,
    private formateurServ : FormateurService,
    private formationServ : FormationService,
    private sessionServ : SessionService
  ){}

  //just for sessions
  formateurs !: Formateur[];
  candidats!:Candidat[];
  formations !: Formation[];
  sessions !: Session[];

  //this what to show
  showSession !: SessionToRead[];

  sessionDetail!:SessionToRead;




  // pop up view
  private modalService = inject(NgbModal);

  openPopup(content : TemplateRef<any>){
    this.modalService.open(content , {backdropClass : 'pop-up-backdrop' })
  }

  //////////////////////////////////////////////////////////////////

  ngOnInit(): void {

    this.candidatServ.getAllCandidats().subscribe({next : (candidat) => this.candidats = candidat})
    this.formateurServ.getAllFormateurs().subscribe({next : (formateurs) => this.formateurs = formateurs})
    this.formationServ.getFormations().subscribe({next : (formations) => this.formations = formations})
    this.sessionServ.getAllSessions().subscribe({next : (sessions) => this.sessions = sessions})
  
    this.showSession = [];
    setTimeout(() => {
      this.sessions.forEach(session => {
        const sessionData = {
          id: session.id,
          formation: session.formation,
          titreFormation: this.giveTitreF(session.id!),
          formateurs: session.formateurs,
          nomFormateurs: session.formateurs.map(f => this.giveNameF(f)),
          candidats: session.candidats,
          nomCandidats: session.candidats.map(c => this.giveNameC(c)),
          dateDebut: session.dateDebut,
          dateFin: session.dateFin,
          planningSeances: session.planningSeances,
        };
      
        this.showSession.push(sessionData);
      });
      
      console.log(this.sessions);
  
    }, 500);

    
    

  
    // this.sessions.forEach(session => {

    //   this.showSession.push({ 
    //     id : session.id,
    //     formation: session.formation,
    //     titreFormation : this.giveTitreF(session.id) , 
    //     formateurs: session.formateurs, 
    //     nomFormateurs: session.formateurs.map(f => this.giveNameF(f)  ) ,
    //     candidats: session.candidats,
    //     nomCandidats: session.candidats.map(c => this.giveNameC(c)  ),
    //     dateDebut: session.dateDebut,
    //     dateFin: session.dateFin,
    //     planningSeances: session.planningSeances, 
    //     })
    // });

    
  }

  giveName(sub : any){
    return sub.nom
  }

  giveNameC( id : number ){
    return this.candidats.filter( c => c.id===id )[0].nom
  }
  giveNameF( id : number ){
    return this.formateurs.filter( f => f.id===id )[0].nom
  }
  giveTitreF(id : number){
    return this.formations.filter( f => f.id===id )[0].titre
  }


   //changer String to tab specialites

changeSpeToSt(st : string[]): string  {
  return st.map(s => s).join(', ');
}


opendetail(content: TemplateRef<any> , session : SessionToRead){
  this.sessionDetail = session;
  this.openPopup(content);
}

supprimer(){

  this.sessionServ.deleteSession(this.sessionDetail.id!).subscribe(
    {next : () => {
      this.ngOnInit();
      this.modalService.dismissAll();
    }}
  )

}


  

}
