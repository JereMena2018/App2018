
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';


import { AngularFireDatabase} from "angularfire2/database";
import * as firebase from 'firebase';


@Injectable()
export class CargaArchivoProvider {

  imagenes: ArchivoSubir[] = [];



  constructor(public toastCtrl: ToastController, 
              public afDB: AngularFireDatabase,
              ) {
    console.log('Hello CargaArchivoProvider Provider');
  }

  cargar_imagen_firebase( archivo: ArchivoSubir ){

    let promesa = new Promise ( ( resolve, reject)=>{

      this.mostrar_toast('Cargando producto...');

      let storeRef = firebase.storage().ref();
      let nombreArchivo:string = new Date().valueOf().toString();

      let uploadTask: firebase.storage.UploadTask = 
          storeRef.child(`img/${ nombreArchivo }`)
                   .putString( archivo.img, 'base64', { contentType: 'image/jpeg' } );   

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        
        ()=>{ },
        ( error )=>{
          console.log("ERROR EN LA CARGA");
          console.log(JSON.stringify( error ));
          this.mostrar_toast("Error al cargar el producto");
          reject();
        },
        ()=>{
          console.log("Archivo subido");
          this.mostrar_toast('Producto subido correctamente');

          let url = uploadTask.snapshot.downloadURL;

          this.subir_archivo( archivo.descuento, archivo.fecha, url, archivo.nombre, archivo.precio, archivo.preciofinal, nombreArchivo );

          resolve();
        }
      
      ) 
      
    });

    return promesa;

  }

  private subir_archivo( nombre:string, 
    fecha:string, 
    precio:string, 
    descuento:string, 
    preciofinal:string, 
    url:string, 
    nombreArchivo:string){

    let producto: ArchivoSubir = {
      img: url,
      nombre: nombre,
      fecha: fecha,
      precio: precio,
      descuento: descuento,
      preciofinal: preciofinal,
      key: nombreArchivo,
    };

    console.log( JSON.stringify(producto) );

    this.afDB.object(`/producto/${ nombreArchivo }`).update(producto);

    this.imagenes.push( producto );

  }

  mostrar_toast( mensaje: string){
   
    this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
    }).present();
  }
}

interface ArchivoSubir {
  img: string;
  nombre: string;
  fecha: string;
  precio: string;
  descuento: string;
  preciofinal: string;
  key?: string;
}