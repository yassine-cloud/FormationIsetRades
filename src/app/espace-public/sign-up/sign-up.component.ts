import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/Interfaces/candidat';
import { Formateur } from 'src/app/Interfaces/formateur';
import { CandidatService } from 'src/app/Services/candidat.service';
import { FormateurService } from 'src/app/Services/formateur.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private formBuild : FormBuilder , private candidatServ : CandidatService , private formateurServ : FormateurService , private router : Router ){  }

  ngOnInit(): void {
    
  }

  matchingPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  formCandidat !: FormGroup;
  formFormateur !: FormGroup;
  role : string = ""  ;

  formSelect = this.formBuild.group({
    role : ["" , Validators.required]
  })

  selected(){
    this.role = this.formSelect.value.role!
    if (this.role == 'candidat'){
      this.formCandidat = this.formBuild.group( {
        nom : ["",Validators.required],
        prenom : ["",Validators.required],
        cin : ["",Validators.required],
        email : ["",[Validators.required , Validators.email]],
        password : [ "" ,Validators.required],
        confirmPassword : ["" ,Validators.required],
        role : [this.role , Validators.required ]
      } )
      this.formCandidat.addValidators(
        this.matchingPasswords
      )
    } 
    else {

      this.formFormateur = this.formBuild.group({
        nom : ["",Validators.required],
        prenom : ["",Validators.required],
        cin : ["",Validators.required],
        email : ["",[Validators.required , Validators.email]],
        tel : ["",Validators.required],
        specialites : ["",[Validators.required,Validators.pattern("[a-zA-Z0-9]+(,[ a-zA-Z0-9]+)*")]],
        password : [ "" ,Validators.required],
        confirmPassword : ["" ,Validators.required],
        role : [this.role , Validators.required]
      })
      this.formFormateur.addValidators(
        this.matchingPasswords
      )

    }
  }


  signCandidat(){
    this.candidatServ.register(this.formCandidat.value as Candidat).subscribe(
      (res) => {
        if(res){
          this.router.navigate(["/"]);
        }
        else{
          alert("Problem das la connexion");
        }
      }
    )
  }

  signFormateur(){
    this.formFormateur.value.specialites = this.formateurServ.changeToSpe(this.formFormateur.value.specialites)
    this.formateurServ.register(this.formFormateur.value as Formateur).subscribe(
      (res) => {
        if(res){
          this.router.navigate(["/"]);
        }
        else{
          alert("Problem das la connexion");
          this.router.navigate(["/"]);
        }
      }
    )
  }




  

  

  


}
