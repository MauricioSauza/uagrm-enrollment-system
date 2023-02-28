import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ILectures, IParallels } from 'src/app/interfaces/materias-interfaces';
import { LecturesService } from 'src/app/services/lectures.service';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss']
})
export class EnrollmentsComponent implements OnInit {
  public materias: ILectures[];
  public lecturesPicked: ILectures[] = [
    {
      nombre: '',
      sigla: '',
      semestre: 0,
      paralelos: [
        {
          disabled: true,
          nombre: '',
          sigla: '',
          semestre: 0,
          grupo: 'SS',
          docente: 'Nombre del docente',
          cupos: 0,
          horario: [{
            dia: 'dom',
            hora_inicio: '00:00',
            hora_fin: '00:00',
          }]
        }
      ]
    }
  ]

  constructor(
    private lecturesService: LecturesService
  ) { }

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
    });
  };

  drop(event: CdkDragDrop<IParallels[]>) {
      if(event.previousContainer.data !== event.container.data) {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      } 
  }
}
