import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Mensaje } from 'src/app/model/mensaje';
import { ContactosService } from 'src/app/services/contactos.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  message: Mensaje = new Mensaje();

  worked: boolean = false;

  imgData: string;
  imgURL: string;


  constructor(private route: ActivatedRoute, private router: Router,
    public contactService: ContactosService , private  camera : Camera) { 

    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.message = this.router.getCurrentNavigation().extras.queryParams.contacto;
        console.log(this.message.image);
      }
    });
  }

  ngOnInit() {
  }

  guardar(){
    console.log(this.message, this.worked);

    this.contactService.saveContacto(this.message);
 
    let navigationExtras: NavigationExtras = {
      queryParams: {
        message: this.message,
        worked: this.worked
      }
    };
  }

  imageSeleccionada(data){
    console.log(data);
    this.imgData = data;
  }

  uploadFinished(data){
    this.message.image = data;
  }

  tomarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // Do something with the new photo

    }, (err) => {
     // Handle error
     console.log("Camera issue: " + err);
    });
  
    
  }

    
}
