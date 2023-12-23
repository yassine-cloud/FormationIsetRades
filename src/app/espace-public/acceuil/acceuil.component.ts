import { Component, OnInit } from '@angular/core';
import { Formation } from 'src/app/Interfaces/formation';
import { FormationService } from 'src/app/Services/formation.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  constructor(private formationServ : FormationService){}

  formations : Formation[]=[]
  Categories : string[]=[]

  ngOnInit(): void {

    this.formationServ.getFormations().subscribe({
      next : (formations) => {
          this.formations = formations;
          this.Categories.push(...formations.map(f => {return f.categories[0]}))
      },
    })
      
  }

  formationByCategorie(categorie : string){

    return [...this.formations.filter(f => f.categories.includes(categorie))]

  }


}
