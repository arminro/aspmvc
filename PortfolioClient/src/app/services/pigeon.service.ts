import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PigeonService {

  private data = new BehaviorSubject<string>(null);
  private currentData = this.data.asObservable();

  public get getCurrentData(): Observable<string> {
    return this.currentData;
  }

  public sendData(jsonData: string) {
    this.data.next(jsonData);
  }
}
