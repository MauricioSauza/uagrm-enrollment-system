import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LecturesService {

  constructor(
    private http: HttpClient
  ) { }

  public getLectures() {
    return this.http.get("localhost/lectures");
  }
}
