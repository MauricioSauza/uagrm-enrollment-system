import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { LecturesService } from 'src/app/services/lectures.service';


@Component({
  selector: 'app-adicion',
  templateUrl: './adicion.component.html',
  styleUrls: ['./adicion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdicionComponent implements OnInit {
  public materias: any;
  public paralells: any;
  public lecturesPicked: any; 
  
  constructor(
    private lecturesService: LecturesService
  ) {}

  ngOnInit(): void {
    this.getLectures();
  }
  private getLectures() {
    this.lecturesService.getLectures().subscribe((response: any) => {
      this.materias = response.map(function (item: any) {
        return {
          nombre: item.nombre,
          sigla: item.sigla,
          semestre: item.semestre,
          paralelos: item.paralelos
        }     
      });
      this.paralells = this.materias.map((item:any) => {
        return {
          paralelos: item.paralelos
        }
      });
      console.log(this.paralells);
    });
  };

  drop(event: CdkDragDrop<any>) {
    if(event.previousContainer.data === this.lecturesPicked
      ) {
        transferArrayItem(
          event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex
        );
      } 
  }

}
