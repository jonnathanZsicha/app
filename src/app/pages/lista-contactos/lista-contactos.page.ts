import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactosService } from 'src/app/services/contactos.service';

@Component({
  selector: 'app-lista-contactos',
  templateUrl: './lista-contactos.page.html',
  styleUrls: ['./lista-contactos.page.scss'],
})
export class ListaContactosPage implements OnInit {

  contactos :any;

  constructor(public contactoService : ContactosService , public router:Router) { }

  ngOnInit() {

    this.contactos = this.contactoService.getContactos();
  }

  nuevoContacto(){
    this.router.navigate(['/contact']);
  }

}
