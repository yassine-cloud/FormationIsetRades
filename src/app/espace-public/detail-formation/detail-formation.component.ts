import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formation } from 'src/app/Interfaces/formation';
import { Session } from 'src/app/Interfaces/session';
import { FormationService } from 'src/app/Services/formation.service';
import { SessionService } from 'src/app/Services/session.service';

@Component({
  selector: 'app-detail-formation',
  templateUrl: './detail-formation.component.html',
  styleUrls: ['./detail-formation.component.css']
})
export class DetailFormationComponent implements OnInit {

  constructor(private activeRoute : ActivatedRoute , private formationServ : FormationService , private sessionServ : SessionService){}

  formation !: Formation;
  sessions : Session[] =[];
  id !: string;


  ngOnInit(): void {
    this.activeRoute.params.subscribe(value => {
      this.id = value["id"];
      
    })
    this.formationServ.getFormationById(+this.id).subscribe(formation => this.formation=formation);
    this.sessionServ.getSessionsByFormation(this.id).subscribe(sessions => this.sessions = sessions);

      
  }

}
