import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ProductoPage } from '../producto/producto';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  productos: Observable<any[]>;

  constructor(public navCtrl: NavController,
     public modalCtrl: ModalController,
     private afDB: AngularFireDatabase
    ) {
      this.productos = afDB.list('producto').valueChanges();
  }
logout(){
  this.navCtrl.popToRoot();
}
opciones(){
  let modal = this.modalCtrl.create(ProductoPage);
  modal.present();
}

}
