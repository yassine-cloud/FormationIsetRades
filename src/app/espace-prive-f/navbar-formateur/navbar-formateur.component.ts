import { Component, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar-formateur',
  templateUrl: './navbar-formateur.component.html',
  styleUrls: ['./navbar-formateur.component.css']
})
export class NavbarFormateurComponent {

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
