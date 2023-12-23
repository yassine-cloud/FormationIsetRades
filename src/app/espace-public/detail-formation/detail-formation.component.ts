import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Candidat } from 'src/app/Interfaces/candidat';
import { Formateur } from 'src/app/Interfaces/formateur';
import { Formation } from 'src/app/Interfaces/formation';
import { Session } from 'src/app/Interfaces/session';
import { ConnexionService } from 'src/app/Services/connexion.service';
import { FormateurService } from 'src/app/Services/formateur.service';
import { FormationService } from 'src/app/Services/formation.service';
import { LoginService } from 'src/app/Services/login.service';
import { SessionService } from 'src/app/Services/session.service';

@Component({
  selector: 'app-detail-formation',
  templateUrl: './detail-formation.component.html',
  styleUrls: ['./detail-formation.component.css']
})
export class DetailFormationComponent implements OnInit {

  // pop up view
  private modalService = inject(NgbModal);

  // form
  formerror = false;
  formLogin = this.formbuild.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  /////////////////////////////////////////

  constructor( private formateurServ :FormateurService , private activeRoute : ActivatedRoute , private formbuild : FormBuilder , private formationServ : FormationService , private sessionServ : SessionService , private loginServ : LoginService , private conn : ConnexionService){}

  formation !: Formation;
  sessions !:  Session[] ;
  id !: string;
  canInscrit !: boolean ;
  role : string | undefined ;
  userName !:string ;
  idSessionAInscrire !: number;

  //
  formateurs ! : Formateur[];
  typeSession : {id:number , formateur : string[] , dateD:string , dateF : string , candidats : number[] }[]=[]; 
  giveNameF( id : number ){
    return this.formateurs.filter(  f => f.id===id )[0].nom 
  }


  ngOnInit(): void {
    this.typeSession=[];
    this.activeRoute.params.subscribe(value => {
      this.id = value["id"];      
    })
    this.formationServ.getFormationById(+this.id).subscribe(formation => this.formation=formation);
    this.sessionServ.getSessionsByFormation(this.id).subscribe({ next : (sessions) => {
      this.sessions = sessions;
      if(sessions.length!=0){
        this.formateurServ.getAllFormateurs().subscribe({next:formateurs => this.formateurs=formateurs })

        setTimeout(() => {
          sessions.forEach(sess => {
          const sessionDat = {
            id : sess.id!,
            formateur : sess.formateurs.map(f => this.giveNameF(f)), 
            dateD:sess.dateDebut , 
            dateF : sess.dateFin , 
            candidats : sess.candidats
          }

          this.typeSession.push( sessionDat )
        })
        }, 500);
        

      }
    }});
    
    this.role = this.conn.userRole();
  }

  // nomFormateurs( ids: number[]){
  //   let nom : string ="";
  //   this.formateurServ.nomFormateurs(ids).subscribe( {next : n => nom = n} )
  //   return nom;

  // }

  canInscrire(candidats : number[]){
    if ( this.role =='formateur' || this.role == 'admin'   ){
      return false ;
    }
    else if( candidats.length >= 15 || ( this.role=='candidat' && candidats.includes(+JSON.parse(sessionStorage.getItem("user")!).id)) ){
      return false;
    } 
    else{
      return true;
    }
  }

  inscrire(id : number , login :TemplateRef<any> , message : TemplateRef<any> ){
      if(this.conn.controle()){
        this.userName = this.conn.nom!;
        this.idSessionAInscrire = id;
        this.modalService.open(message, { backdropClass: 'pop-up-backdrop' })
      }
      else{
        this.modalService.open(login, { backdropClass: 'pop-up-backdrop' });
      }
    
    
    
  }

  confirmer(){
    
    this.sessionServ.ajouterCandidat(this.id,JSON.parse(sessionStorage.getItem("user")!).id).subscribe(
      send =>{
        
          this.ngOnInit()
        
      } 
    )
    this.modalService.dismissAll();
  }


  connecter() {
    this.loginServ
      .loginUser(this.formLogin.value.email!, this.formLogin.value.password!)
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.conn.controle();
          this.modalService.dismissAll("connected");
          this.formLogin.reset();
          this.formerror=false;
          this.ngOnInit();
          
        } else {
          this.formLogin.reset();
          this.formLogin.markAllAsTouched();
          this.formerror = true;
        }
      });
  }

}
