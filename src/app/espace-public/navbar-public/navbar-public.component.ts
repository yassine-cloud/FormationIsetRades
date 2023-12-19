import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar-public',
  templateUrl: './navbar-public.component.html',
  styleUrls: ['./navbar-public.component.css'],
  
  
})
export class NavbarPublicComponent implements OnInit {

  // pop up view
  private modalService = inject(NgbModal);

  openPopup(content : TemplateRef<any>){
    this.modalService.open(content , {backdropClass : 'pop-up-backdrop' })
  }

  //////////////////////////////////////////////////////////////////

  ngOnInit(): void {
      
  }
  

}
