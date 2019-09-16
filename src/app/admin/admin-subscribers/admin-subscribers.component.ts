import { Component, OnInit } from '@angular/core';
import { SubscribersService } from 'src/app/shared/services/subscribers.service';
import { NewSubscriber } from 'src/app/shared/classes/new-subscriber.class';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-subscribers',
  templateUrl: './admin-subscribers.component.html',
  styleUrls: ['./admin-subscribers.component.css']
})
export class AdminSubscribersComponent implements OnInit {
  subscriber: NewSubscriber[]
  constructor(private subscribersService: SubscribersService, private firestore: AngularFirestore, private toastr: ToastrService) {
    this.subscribersService.getSubscriber().subscribe(adminSubscriber => {
      this.subscriber = adminSubscriber.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as NewSubscriber
      })
    })
  }

  ngOnInit() {

  }
  ind: any;
  isEditSubscribe(sub: NewSubscriber) {
    this.subscribersService.formDatas = Object.assign({}, sub);
  }

  isDeleteSubscribe(id: string) {
    this.firestore.doc('subscribers/' + id).delete()
    this.toastr.warning('This subscribers successfully delete')
  }
}
