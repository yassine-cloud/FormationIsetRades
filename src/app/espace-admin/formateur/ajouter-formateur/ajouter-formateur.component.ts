import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Formateur } from 'src/app/Interfaces/formateur';
import { FormateurService } from 'src/app/Services/formateur.service';

@Component({
  selector: 'app-ajouter-formateur',
  templateUrl: './ajouter-formateur.component.html',
  styleUrls: ['./ajouter-formateur.component.css']
})
export class AjouterFormateurComponent {

  constructor(private formBuild : FormBuilder , private formateurServ : FormateurService, private router : Router){}

  matchingPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }


  formFormateur !: FormGroup;
  // registreFormateur !: Formateur;
  role="formateur";

 ngOnInit(): void {
  this.formFormateur = this.formBuild.group({
    nom : ["",Validators.required],
    prenom : ["",Validators.required],
    cin : ["",Validators.required],
    email : ["",[Validators.required , Validators.email]],
    tel : ["",Validators.required],
    specialites : ["",[Validators.required,Validators.pattern("[ a-zA-Z0-9]+(,[ a-zA-Z0-9]+)*")]],
    password : [ "" ,[Validators.required , Validators.minLength(4)]],
    confirmPassword : ["" ,[Validators.required , Validators.minLength(4)]],
    role : [this.role , Validators.required]
  })
  this.formFormateur.addValidators(
    this.matchingPasswords
  )
 }


 ajoutFormateur(){
  let formValue = this.formFormateur.value ;
  formValue.specialites = this.formateurServ.changeToSpe(formValue.specialites)
  delete formValue.confirmPassword;
  this.formateurServ.registerParAdmin(formValue as Formateur).subscribe(
    (res) => {
      if(res){
        this.router.navigate(["/admin","afficher-formateurs"]);
      }
      else{
        alert("Problem das la connexion");
        this.router.navigate(["/admin","afficher-formateurs"]);
      }
    }
  )
  console.log(formValue);
  
}
  

}
