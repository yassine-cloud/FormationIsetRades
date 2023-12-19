import { Component, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent {
  
  // pop up view
  private modalService = inject(NgbModal);

  openPopup(content : TemplateRef<any>){
    this.modalService.open(content , {  backdropClass : 'pop-up-backdrop' })
  }
  //////////////////////////////////////////////////////////////////

}
