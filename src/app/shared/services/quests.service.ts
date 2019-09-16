import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuest } from '../interfaces/quest.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestsService {
  private urlQuests: string;
  constructor(private http: HttpClient) {
    this.urlQuests = 'http://localhost:3000/quests'
  }

  public getQuests(): Observable<Array<IQuest>> {
    return this.http.get<Array<IQuest>>(this.urlQuests)
  }

  public setQuests(quest: IQuest): Observable<Array<IQuest>> {
    return this.http.post<Array<IQuest>>(this.urlQuests, quest);
  }

  public delQuests(idQuest: number): Observable<Array<IQuest>> {
    return this.http.delete<Array<IQuest>>(`${this.urlQuests}/${idQuest}`);
  }

  public editQuests(quest: IQuest): Observable<Array<IQuest>> {
    return this.http.put<Array<IQuest>>(`${this.urlQuests}/${quest.id}`, quest);
  }
}
