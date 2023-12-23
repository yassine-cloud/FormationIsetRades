import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/Interfaces/candidat';
import { CandidatService } from 'src/app/Services/candidat.service';

@Component({
  selector: 'app-ajouter-candidat',
  templateUrl: './ajouter-candidat.component.html',
  styleUrls: ['./ajouter-candidat.component.css']
})
export class AjouterCandidatComponent implements OnInit {

  constructor(private formBuild : FormBuilder , private candidatServ : CandidatService, private router : Router){}

  matchingPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  formCandidat !: FormGroup;
  // registreCandidat !: Candidat;
  role="candidat";

 ngOnInit(): void {
  this.formCandidat = this.formBuild.group( {
    nom : ["",Validators.required],
    prenom : ["",Validators.required],
    cin : ["",Validators.required],
    email : ["",[Validators.required , Validators.email]],
    password : [ "" ,[Validators.required , Validators.minLength(4)]],
    confirmPassword : ["" ,[Validators.required , Validators.minLength(4)]],
    role : [this.role , Validators.required ]
  } )
  this.formCandidat.addValidators(
    this.matchingPasswords
  )
 }


 ajoutCandidat(){
  const formValue = this.formCandidat.value ;
  delete formValue.confirmPassword;
  this.candidatServ.registerParAdmin(formValue as Candidat).subscribe(
    (res) => {
      if(res){
        this.router.navigate(["/admin","afficher-candidats"]);
      }
      else{
        alert("Problem dans la connexion");
        this.router.navigate(["/admin","afficher-candidats"]);
      }
    }
  )
  console.log(formValue);
  
}
  






}
