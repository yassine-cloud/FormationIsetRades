import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Formation } from 'src/app/Interfaces/formation';
import { FormationService } from 'src/app/Services/formation.service';

@Component({
  selector: 'app-editer-formation',
  templateUrl: './editer-formation.component.html',
  styleUrls: ['./editer-formation.component.css']
})
export class EditerFormationComponent {

  constructor(private formBuild : FormBuilder , private router : Router,private formationService: FormationService , private activatedRoute : ActivatedRoute){}


  form !: FormGroup;
  registreFormation !: Formation;
  id!:string ;
  

 ngOnInit(): void {

  this.form = this.formBuild.group({
    titre: ["",Validators.required] , 
    description: ["",Validators.required],
    chargeHoraire: ["",[Validators.required]],
    programme: ["",[Validators.required,Validators.pattern("[^,]+(,[^,]+)*")]],
    niveau:["",Validators.required],
    motsCles: ["",[Validators.required,Validators.pattern("[^,]+(,[^,]+)*")]],
    categories: ["",[Validators.required,Validators.pattern("[^,]+(,[^,]+)*")]],
    img : ["", [Validators.required]]
  });
  

 


  this.activatedRoute.params.subscribe(value => {
    this.id = value["id"]; 
    this.formationService.getFormationById(+this.id).subscribe({
      next : (formation) =>{
        this.registreFormation = formation ;        
      },
      complete : ()=>{
        this.form = this.formBuild.group( {
          titre: [this.registreFormation.titre,Validators.required] , 
          description: [this.registreFormation.description,Validators.required],
          chargeHoraire: [this.registreFormation.chargeHoraire,[Validators.required]],
          programme: [this.registreFormation.programme,[Validators.required,Validators.pattern("[^,]+(,[^,]+)*")]],
          niveau:[this.registreFormation.niveau,Validators.required],
          motsCles: [ this.formationService.changeSpeToSt( this.registreFormation.motsCles ) ,[Validators.required,Validators.pattern("[^,]+(,[^,]+)*")]],
          categories: [ this.formationService.changeSpeToSt( this.registreFormation.categories ) ,[Validators.required,Validators.pattern("[^,]+(,[^,]+)*")]],
          img : [this.registreFormation.img, [Validators.required]]
        })
      }
    })     
  })

  

  
 }


 editerFormation(){
  const formValue = this.form.value ;
   formValue.motsCles = this.formationService.changeToSpe(this.form.value["motsCles"]);
   formValue.categories = this.formationService.changeToSpe(this.form.value["categories"]);
    this.formationService.updateFormation(this.id,formValue as Formation).subscribe({
      next : (data)=> {
        if(data){
          this.router.navigate(["/admin","afficher-formations"]);
        }
        else{
          alert("Problem dans la connexion");
          this.router.navigate(["/admin","afficher-formations"]);
        }
      }
    })
  console.log(formValue);
  
}
  





}
