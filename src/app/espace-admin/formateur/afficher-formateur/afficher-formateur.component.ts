import { Component, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-afficher-formateur',
  templateUrl: './afficher-formateur.component.html',
  styleUrls: ['./afficher-formateur.component.css']
})
export class AfficherFormateurComponent {

// pop up view
private modalService = inject(NgbModal);

openPopup(content : TemplateRef<any>){
  this.modalService.open(content , {backdropClass : 'pop-up-backdrop' })
}

//////////////////////////////////////////////////////////////////

}
