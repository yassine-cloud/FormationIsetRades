import { Component, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-afficher-session-formation',
  templateUrl: './afficher-session-formation.component.html',
  styleUrls: ['./afficher-session-formation.component.css']
})
export class AfficherSessionFormationComponent {



  // pop up view
  private modalService = inject(NgbModal);

  openPopup(content : TemplateRef<any>){
    this.modalService.open(content , {backdropClass : 'pop-up-backdrop' })
  }

  //////////////////////////////////////////////////////////////////

}
