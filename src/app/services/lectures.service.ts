import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LecturesService implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
      this.getLectures();
  }

  public getLectures() {
    return this.http.get("http://localhost:3000/lectures");
  }

  public getParallels() {
    return this.http.get("http://localhost:3000/lectures/parallels");
  }

  public getEnrollments() {
    return this.http.get("http://localhost:3000/lectures/enrollment");
  }
  
  public getLecturesWithEnrollment() {
    return this.http.get("http://localhost:3000/lectures/lecturesWithEnrollment");
  }
}
