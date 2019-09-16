import { Injectable } from '@angular/core';
import { NewRealUser } from '../classes/new-realUser.class';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  formUser: NewRealUser
  constructor(private firestore: AngularFirestore) { }

  getUser() {
    return this.firestore.collection('users').snapshotChanges()
  }
}
