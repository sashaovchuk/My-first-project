import { Component, OnInit } from '@angular/core';
import { IQuest } from 'src/app/shared/interfaces/quest.interface';
import { Quest } from 'src/app/shared/classes/new-quest.class';
import { QuestsService } from 'src/app/shared/services/quests.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  index: number;
  who: string = JSON.parse(sessionStorage.getItem('names'))
  topic: string;
  message: string;
  date: Date = new Date();
  editWho: string;
  editIndex: number;
  editTopic: string;
  editMessage: string;
  quests: Array<IQuest> = [];
  editId: number;
  constructor(private questsService: QuestsService, private firestore: AngularFirestore) {
    this.getQuest()
  }
  ngOnInit() {
  }
  private getQuest(): void {
    this.questsService.getQuests().subscribe(
      data => {
        this.quests = data;
      },
      err => {
        console.log(err)
      }
    )
  }
  getWho(): string {
    if (sessionStorage.length > 0) {
      return this.who = JSON.parse(sessionStorage.getItem('names'))
    }
    else {
      return this.who = ''
    }
  }

  public addQuest(): void {
    if (this.who == undefined || this.who == 'Who are you?') {
      alert('Please sign in')
    }
    else {
      const quest: IQuest = new Quest(
        0,
        this.who,
        this.topic,
        this.message,
        this.date = new Date()
      )
      quest.id = this.quests.slice(-1)[0].id + 1
      this.topic = '',
        this.message = '',
        this.date = new Date()
      this.questsService.setQuests(quest).subscribe(
        () => {
          this.getQuest();
        }
      )
    }
  }
  public deleteQuest(quest: IQuest): void {
    const idQuest = quest.id
    this.questsService.delQuests(idQuest).subscribe(
      () => {
        this.getQuest();
      }
    )
  }
  public editQuest(quest: IQuest): void {
    this.editId = quest.id;
    this.editWho = quest.who
    this.editTopic = quest.topic
    this.editMessage = quest.message
  }
  public editSaveChange(): void {
    const newQuest = new Quest(
      this.editId,
      this.editWho,
      this.editTopic,
      this.editMessage,
      this.date = new Date()
    )
    this.questsService.editQuests(newQuest).subscribe(
      () => {
        this.getQuest();
      }
    )
    this.editTopic = ''
    this.editMessage = ''
  }
}