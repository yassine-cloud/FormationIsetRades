import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Formateur } from 'src/app/Interfaces/formateur';
import { FormateurService } from 'src/app/Services/formateur.service';

@Component({
  selector: 'app-editer-formateur',
  templateUrl: './editer-formateur.component.html',
  styleUrls: ['./editer-formateur.component.css']
})
export class EditerFormateurComponent {

  constructor(private activeRoute : ActivatedRoute , private formBuild : FormBuilder , private formateurServ : FormateurService, private router : Router){}

  matchingPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }


  formFormateur !: FormGroup;
  registreFormateur !: Formateur;
  role="formateur";
  id!:string ;
  

 ngOnInit(): void {

  this.formFormateur = this.formBuild.group( {
    nom : ["",Validators.required],
    prenom : ["",Validators.required],
    cin : ["",Validators.required],
    email : ["",[Validators.required , Validators.email]],
    tel : ["", Validators.required],
    specialites : ["", [Validators.required,Validators.pattern("[ a-zA-Z0-9]+(,[ a-zA-Z0-9]+)*")]],
    role : [this.role , Validators.required ]
  } )
  

 


  this.activeRoute.params.subscribe(value => {
    this.id = value["id"]; 
    this.formateurServ.getFormateurById(this.id).subscribe({
      next : (formateur) =>{
        this.registreFormateur = formateur ;        
      },
      complete : ()=>{
        this.formFormateur = this.formBuild.group( {
          nom : [this.registreFormateur.nom,Validators.required],
          prenom : [this.registreFormateur.prenom,Validators.required],
          cin : [this.registreFormateur.cin,Validators.required],
          email : [this.registreFormateur.email,[Validators.required , Validators.email]],
          tel : [this.registreFormateur.tel, Validators.required],
          specialites : [ this.formateurServ.changeSpeToSt(this.registreFormateur.specialites), [Validators.required,Validators.pattern("[ a-zA-Z0-9]+(,[ a-zA-Z0-9]+)*")]],
          // password : [ "" ,[Validators.required , Validators.minLength(4)]],
          // confirmPassword : ["" ,[Validators.required , Validators.minLength(4)]],
          role : [this.role , Validators.required ]
        } )
      }
    })     
  })

  

  

  // this.formateurServ.getFormateurById(this.id).pipe(
  //   map((formateur)=> {

  //     this.formFormateur = this.formBuild.group( {
  //       nom : [formateur.nom,Validators.required],
  //       prenom : [formateur.prenom,Validators.required],
  //       cin : [formateur.cin,Validators.required],
  //       email : [formateur.email,[Validators.required , Validators.email]],
  //       // password : [ "" ,[Validators.required , Validators.minLength(4)]],
  //       // confirmPassword : ["" ,[Validators.required , Validators.minLength(4)]],
  //       role : [this.role , Validators.required ]
  //     } )

  //   }),
  //   catchError(error => {
  //     console.error('Error fetching formateurs:', error);
  //     throw error;
  //   })
    
    
  

  
 }


 editerFormateur(){
  const formValue = this.formFormateur.value ;
  formValue.specialites = this.formateurServ.changeToSpe(formValue.specialites)
  delete formValue.confirmPassword;
  this.formateurServ.updateFormateur(this.id,formValue).subscribe(
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
