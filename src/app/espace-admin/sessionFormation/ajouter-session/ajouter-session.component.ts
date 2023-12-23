import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Candidat } from 'src/app/Interfaces/candidat';
import { Formateur } from 'src/app/Interfaces/formateur';
import { Formation } from 'src/app/Interfaces/formation';
import { Session } from 'src/app/Interfaces/session';
import { CandidatService } from 'src/app/Services/candidat.service';
import { FormateurService } from 'src/app/Services/formateur.service';
import { FormationService } from 'src/app/Services/formation.service';
import { SessionService } from 'src/app/Services/session.service';

@Component({
  selector: 'app-ajouter-session',
  templateUrl: './ajouter-session.component.html',
  styleUrls: ['./ajouter-session.component.css'],
  // providers : [DatePipe]
})
export class AjouterSessionComponent {


  constructor(
    private candidatServ : CandidatService,
    private formateurServ : FormateurService,
    private formationServ : FormationService,
    private sessionServ : SessionService,
    private formbuild : FormBuilder,
    private router : Router
  ){}


//just for sessions
formateurs !: Formateur[];
candidats!:Candidat[];
formations !: Formation[];

//
//variables
form !: FormGroup


dateValidator = (control: AbstractControl): ValidationErrors | null => {
  const dateDebut = control.get('dateDebut')?.value;
  const dateFin = control.get('dateFin')?.value;
  const currentDate = new Date().toISOString().split('T')[0]; // Current date in "yyyy-MM-dd" format

  if (dateDebut && dateFin) {
    if (dateDebut < currentDate) {
      return { 'dateDebutPast': true };
    }

    if (dateFin < dateDebut) {
      return { 'invalidDateRange': true };
    }
  }

  return null;
};
formateursDifferentValidator(control: AbstractControl): Promise<{ formateurs: boolean } | null> | Observable<{ formateurs: boolean } | null> {
  return of(control.get('formateur')?.value !== control.get('formateur2')?.value ? null : { formateurs: true });
}


ngOnInit(): void {

  this.candidatServ.getAllCandidats().subscribe({next : (candidat) => this.candidats = candidat})
  this.formateurServ.getAllFormateurs().subscribe({next : (formateurs) => this.formateurs = formateurs})
  this.formationServ.getFormations().subscribe({next : (formations) => this.formations = formations})

  this.form = this.formbuild.group({
    formation : ["",Validators.required],
    formateur : ["",Validators.required] ,
    formateur2 : [""] ,
    dateDebut : ["",[Validators.required,Validators.pattern("[0-9]{4}-[0-9]{2}-[0-9]{2}")]] , 
    dateFin :["",[Validators.required,Validators.pattern("[0-9]{4}-[0-9]{2}-[0-9]{2}")]] ,
    planningSeances : ["",[Validators.required,Validators.pattern("[^,]+(,[^,]+)*")]]
   } , { validator: this.dateValidator , asyncValidators: this.formateursDifferentValidator } )

}

ajoutSession(){

  let sessiondata  = this.form.value;
  let session : Session = {    
    formation: +sessiondata.formation , // id formation
    formateurs: ( sessiondata.formateur2=="" ? [+sessiondata.formateur] : [+sessiondata.formateur , +sessiondata.formateur2]  ) , // id formateurs max 2
    candidats: [] , // id candidats max 15
    dateDebut: sessiondata.dateDebut,
    dateFin: sessiondata.dateFin,
    planningSeances: this.formateurServ.changeToSpe(sessiondata.planningSeances)
  }

  this.sessionServ.addSession(session as Session).subscribe({
    next : (sess)=>{
      console.log(session);
      console.log(sess);
      
      
      this.router.navigate(["/admin","afficher-sessions"]);
    }
  })





}


}
