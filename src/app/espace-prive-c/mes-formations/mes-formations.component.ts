import { Component, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Formateur } from 'src/app/Interfaces/formateur';
import { Formation } from 'src/app/Interfaces/formation';
import { Session, SessionToRead } from 'src/app/Interfaces/session';
import { FormateurService } from 'src/app/Services/formateur.service';
import { FormationService } from 'src/app/Services/formation.service';
import { SessionService } from 'src/app/Services/session.service';

@Component({
  selector: 'app-mes-formations',
  templateUrl: './mes-formations.component.html',
  styleUrls: ['./mes-formations.component.css']
})
export class MesFormationsComponent {



  constructor(
    private formateurServ : FormateurService,
    private formationServ : FormationService,
    private sessionServ : SessionService
  ){}

  //just for sessions
  formateurs !: Formateur[];
  formations !: Formation[];
  sessions !: Session[];

  //this what to show
  showSession !: SessionToRead[];

  sessionDetail!:SessionToRead;

  idCandidat !: number ;
  




  // pop up view
  private modalService = inject(NgbModal);

  openPopup(content : TemplateRef<any>){
    this.modalService.open(content , {backdropClass : 'pop-up-backdrop' })
  }

  //////////////////////////////////////////////////////////////////

  ngOnInit(): void {
    this.idCandidat = +JSON.parse(sessionStorage.getItem("user")!).id



    this.formateurServ.getAllFormateurs().subscribe({next : (formateurs) => this.formateurs = formateurs})
    this.formationServ.getFormations().subscribe({next : (formations) => this.formations = formations})
    this.sessionServ.getAllSessions().subscribe({next : (sessions) => this.sessions = sessions})
  
    this.showSession = [];
    setTimeout(() => {
      this.sessions.forEach(session => {
        if(session.candidats.includes(this.idCandidat)){
           const sessionData = {
          id: session.id!,
          formation: session.formation,
          titreFormation: this.giveTitreF(session.id!),
          formateurs: session.formateurs,
          nomFormateurs: session.formateurs.map(f => this.giveNameF(f)),
          candidats: session.candidats,
          nomCandidats: ["candidats"],
          dateDebut: session.dateDebut,
          dateFin: session.dateFin,
          planningSeances: session.planningSeances,
        };
      
        this.showSession.push(sessionData);
        }
       
      });
      
      console.log(this.sessions);
  
    }, 500);

    


    
  }

  giveName(sub : any){
    return sub.nom
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















}
