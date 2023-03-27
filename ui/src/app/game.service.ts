import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GameService {

  constructor(private restClient: HttpClient) {

  }

  check(state: { xIndexes: number[], oIndexes: number[] }): Observable<any> {
    return this.restClient.post("/game/check", state);
  }
}
