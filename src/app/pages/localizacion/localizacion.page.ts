import { Component, OnInit } from '@angular/core';

import { Query } from '@firebase/firestore-types'
import { Observable } from 'rxjs';
import { Localizacion } from 'src/app/model/localizacion';
import { LocationService } from 'src/app/services/location.service';
@Component({
  selector: 'app-localizacion',
  templateUrl: './localizacion.page.html',
  styleUrls: ['./localizacion.page.scss'],
})
export class LocalizacionPage implements OnInit {

  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  localizaciones:Observable<any[]>;
  myVar:Localizacion[] = new Array();


  current = {
    latitude: '',
    longitude: '',
    address: ''
  }

  newLocation = {
    latitude: '',
    longitude: '',
    address: ''
  }

  constructor(private locationService: LocationService) {
    this.localizaciones=this.locationService.getSavedLocations();  
  }

  async ngOnInit() {

    this.current = await this.locationService.getCurrentLocation();
    this.locationService.getAddressOfLocation(this.newLocation);
    //this.localizaciones.forEach(q => this.locationService.getAddressOfLocation(q));
  }
  //IS DEPRECATED BY SCORPION
  getSavedLocations(){
    this.locationService.getSavedLocations().subscribe(data =>{
     console.log(data)
      const aux:any=data;
      this.locationService.getAddressOfLocation(aux[0]);
      
    });
  
  }

  setNewLocation(event) {
    if (event) {
      this.newLocation.latitude = event.lat;
      this.newLocation.longitude = event.lng;
      this.locationService.getAddressOfLocation(this.newLocation);
    }
  }


  saveLocation() {
    console.log('enviado a guardar');
    this.locationService.saveDireccion(this.newLocation);
  }
  logInFacebook(){
    
  }

}