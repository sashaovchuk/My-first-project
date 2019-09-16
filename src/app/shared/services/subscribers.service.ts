import { Injectable } from '@angular/core';
import { NewSubscriber } from '../classes/new-subscriber.class';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {
  formDatas: NewSubscriber
  constructor(private firestore: AngularFirestore) { }

  getSubscriber() {
    return this.firestore.collection('subscribers').snapshotChanges()
  }
}
