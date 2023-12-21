import { Component, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar-candidat',
  templateUrl: './navbar-candidat.component.html',
  styleUrls: ['./navbar-candidat.component.css']
})
export class NavbarCandidatComponent {
  
// pop up view
private modalService = inject(NgbModal);

openPopup(content : TemplateRef<any>){
  this.modalService.open(content , {backdropClass : 'pop-up-backdrop' })
}

//////////////////////////////////////////////////////////////////

userName = "yassine";

ngOnInit(): void {
    
}

}
