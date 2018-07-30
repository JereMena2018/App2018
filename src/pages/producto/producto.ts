import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {
  
  imagenPreview: string ="";
  imagen64: string;
  nombre: string ="";
  fecha: string ="";
  precio: string ="";
  descuento: string ="";
  preciofinal: string ="";
  productos: Observable<any[]>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
   private camera: Camera,
   private viewCtrl: ViewController,
  private afDB: AngularFireDatabase,
  private imagePicker: ImagePicker,
  public _cap: CargaArchivoProvider) {
    this.productos = afDB.list('producto').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoPage');
  }

 camara(){
  const options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  this.camera.getPicture(options).then((imageData) => {
 
   this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
   this.imagen64 = imageData;
  }, (err) => {
   console.log( "ERROR EN CAMARA", JSON.stringify(err))
  });
 }

 seleccionar(){

  let opciones: ImagePickerOptions = {
    quality: 50,
    outputType: 1,
    maximumImagesCount: 1,
  }

  this.imagePicker.getPictures(opciones).then((results) => {
    for (var i = 0; i < results.length; i++) {
      this.imagenPreview = 'data:image/jpeg;base64,' + results[i];
      this.imagen64 = results[i];
    }
  }, (err) => {
    console.log("ERROR en selector", JSON.stringify(err));
   });
 }
 
 cargar(){

  let archivo = {
    img:this.imagen64,
    nombre: this.nombre,
    fecha: this.fecha,
    precio: this.precio,
    descuento: this.descuento,
    preciofinal: this.preciofinal,
  }

  this._cap.cargar_imagen_firebase(archivo)
    .then(()=>this.cerrar())

  
 }


 cerrar(){
   this.viewCtrl.dismiss();
 }
}
