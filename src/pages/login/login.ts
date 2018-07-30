import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase/app';
import { HomePage } from '../home/home';





@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('email') email;
  @ViewChild('password') password;

  shows: boolean=false;
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private afauth:AngularFireAuth, 
              private firebaseauth: AngularFireAuth
              ) {
                
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login() {
    this.firebaseauth.auth.signInAnonymously()
    .then(data =>{
      console.log("Inicio de sesión completo!", this.firebaseauth.auth.currentUser);
      this.navCtrl.push(HomePage);
    })
    
}

}