import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Localizacion } from 'src/app/model/localizacion';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private platform: Platform,public afs:AngularFirestore) { }


  async getCurrentLocation(withAddress: boolean = true): Promise<any> {
    let location: any = {};

    return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      var options = {
        frequency: 1000,
        timeout: 15000,
        enableHighAccuracy: true
      };
      navigator.geolocation.getCurrentPosition(
        position => {
          location.latitude = position.coords.latitude;
          location.longitude = position.coords.longitude;
          if (withAddress) {
            let geocoder = new google.maps.Geocoder();
            let latlng = { lat: location.latitude, lng: location.longitude };
            geocoder.geocode({ location: latlng }, (results, status) => {
              if (results != null && results != undefined) {
                location.address = results[0].formatted_address;
              } //end if
              resolve(location);
            });
          } else {
            resolve(location);
          } //end if
        },
        error => {
          resolve(null);
        },
        options
      );
    } //end if
  });
  } 

  async getAddressOfLocation(location: any) {
    let geocoder = new google.maps.Geocoder();
    let latlng = { lat: location.latitude, lng: location.longitude };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (results != null) {
        location.address = results[0].formatted_address;
        return location.address;
      } 
    });
  } 
  async saveDireccion(localizacion: any){
    console.log(localizacion.latitude)
    console.log('Direccion a guardar');
    console.log(localizacion.address);
    const refObra = this.afs.collection("localizaciones");
    if(localizacion.uid==null){
      localizacion.uid=this.afs.createId();
    }
    refObra.doc(localizacion.uid).set(Object.assign({},localizacion),{merge: true})
  }




  getSavedLocations():Observable<any>{
    console.log('TRYING TO GET SAVED LOCATIONS');
    return this.afs.collection("localizaciones").valueChanges();
  }
 


}