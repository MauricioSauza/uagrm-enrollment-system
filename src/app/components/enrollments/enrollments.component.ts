import { Component, OnInit } from '@angular/core';
import { LecturesService } from 'src/app/services/lectures.service';



@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss']
})
export class EnrollmentsComponent implements OnInit {
  public lectures: any;


  constructor(
    private lecturesService: LecturesService,
  ) {}

  ngOnInit(): void {
      // this.getLectures();
  }

  // private getLectures() {
  //   this.
  // }
}
