import { Component, OnInit } from '@angular/core';
import { ConnexionService } from './Services/connexion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FormationIsetRades';

  constructor(protected conn : ConnexionService){}

  

ngOnInit(): void {
  this.conn.controle()

    }




}
