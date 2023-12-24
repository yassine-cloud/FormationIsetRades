import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Formation } from 'src/app/Interfaces/formation';
import { FormationService } from 'src/app/Services/formation.service';

@Component({
  selector: 'app-ajouter-formation',
  templateUrl: './ajouter-formation.component.html',
  styleUrls: ['./ajouter-formation.component.css']
})
export class AjouterFormationComponent {

  //variables
form !: FormGroup ;

constructor(private formBuild : FormBuilder ,private formationService : FormationService, private router : Router){}

//initialisation
ngOnInit(): void {
  this.form = this.formBuild.group({
    titre: ["",Validators.required] , 
    description: ["",Validators.required],
    chargeHoraire: ["",[Validators.required]],
    programme: ["",[Validators.required,Validators.pattern("[^,]+(,[^,]+)*")]],
    niveau:["",Validators.required],
    motsCles: ["",[Validators.required,Validators.pattern("[^,]+(,[^,])*")]],
    categories: ["",[Validators.required,Validators.pattern("[^,]+(,[^,]+)*")]],
    img : ["", [Validators.required]]
  });
}

//fonctions
  
ajoutFormation(){
  if (this.form.valid){
    let newFormation =this.form.value ;
    newFormation.motsCles = this.formationService.changeToSpe(this.form.value["motsCles"]);
    newFormation.categories = this.formationService.changeToSpe(this.form.value["categories"]);
    this.formationService.addFormation(newFormation as Formation).subscribe({
      next : (data)=> {
        if(data){
          this.router.navigate(["/admin","afficher-formations"]);
        }
        else{
          alert("Problem dans la connexion");
          this.router.navigate(["/admin","afficher-formations"]);
        }
      }
    });

    }else{
      console.log("form invalid!!");

  }
  this.router.navigate(['/admin','afficher-formations']);

}

}
