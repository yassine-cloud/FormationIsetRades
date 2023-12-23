import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs';
import { Candidat } from 'src/app/Interfaces/candidat';
import { CandidatService } from 'src/app/Services/candidat.service';

@Component({
  selector: 'app-editer-candidat',
  templateUrl: './editer-candidat.component.html',
  styleUrls: ['./editer-candidat.component.css']
})
export class EditerCandidatComponent implements OnInit {

  constructor(private activeRoute : ActivatedRoute ,private formBuild : FormBuilder , private candidatServ : CandidatService, private router : Router){}


  matchingPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  formCandidat !: FormGroup;
  registreCandidat !: Candidat;
  role="candidat";
  id!:string ;
  

 ngOnInit(): void {

  this.formCandidat = this.formBuild.group( {
    nom : ["",Validators.required],
    prenom : ["",Validators.required],
    cin : ["",Validators.required],
    email : ["",[Validators.required , Validators.email]],
    role : [this.role , Validators.required ]
  } )
  

 


  this.activeRoute.params.subscribe(value => {
    this.id = value["id"]; 
    this.candidatServ.getCandidatById(this.id).subscribe({
      next : (candidat) =>{
        this.registreCandidat = candidat ;        
      },
      complete : ()=>{
        this.formCandidat = this.formBuild.group( {
          nom : [this.registreCandidat.nom,Validators.required],
          prenom : [this.registreCandidat.prenom,Validators.required],
          cin : [this.registreCandidat.cin,Validators.required],
          email : [this.registreCandidat.email,[Validators.required , Validators.email]],
          // password : [ "" ,[Validators.required , Validators.minLength(4)]],
          // confirmPassword : ["" ,[Validators.required , Validators.minLength(4)]],
          role : [this.role , Validators.required ]
        } )
      }
    })     
  })

  

  

  // this.candidatServ.getCandidatById(this.id).pipe(
  //   map((candidat)=> {

  //     this.formCandidat = this.formBuild.group( {
  //       nom : [candidat.nom,Validators.required],
  //       prenom : [candidat.prenom,Validators.required],
  //       cin : [candidat.cin,Validators.required],
  //       email : [candidat.email,[Validators.required , Validators.email]],
  //       // password : [ "" ,[Validators.required , Validators.minLength(4)]],
  //       // confirmPassword : ["" ,[Validators.required , Validators.minLength(4)]],
  //       role : [this.role , Validators.required ]
  //     } )

  //   }),
  //   catchError(error => {
  //     console.error('Error fetching candidats:', error);
  //     throw error;
  //   })
    
    
  

  
 }


 editerCandidat(){
  const formValue = this.formCandidat.value ;
  delete formValue.confirmPassword;
  this.candidatServ.updateCandidat(this.id,formValue).subscribe(
    (res) => {
      if(res){
        this.router.navigate(["/admin","afficher-candidats"]);
      }
      else{
        alert("Problem das la connexion");
        this.router.navigate(["/admin","afficher-candidats"]);
      }
    }
  )
  console.log(formValue);
  
}
  

}
