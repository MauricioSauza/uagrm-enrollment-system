import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { LecturesService } from 'src/app/services/lectures.service';



// interface Horario {
//   dia: string;
//   hora_inicio: string;
//   hora_fin: string;
// }

// interface Paralelo {
//   grupo: string;
//   docente: string;
//   cupos: number;
//   horario: Horario[];
// }

// interface Materia {
//   nombre: string;
//   sigla: string;
//   paralelos: Paralelo[];
// }

// interface Semestre {
//   semestre: number;
//   materias: Materia[];
// }

// const data = '[{"semestre":7,"materias":[{"nombre":"Investigacion Operativa II","sigla":"INF418","paralelos":[{"grupo":"SB","docente":"Davalos Sanchez de Mancilla Pi","cupos":10,"horario":[{"dia":"mar","hora_inicio":"10:00","hora_fin":"12:15"},{"dia":"jue","hora_inicio":"10:00","hora_fin":"12:15"}]},{"grupo":"SC","docente":"Sachez Herbas Jose Gabriel","cupos":3,"horario":[{"dia":"lu","hora_inicio":"21:15","hora_fin":"22:45"},{"dia":"mie","hora_inicio":"21:15","hora_fin":"22:45"},{"dia":"vie","hora_inicio":"21:15","hora_fin":"22:45"}]}]},{"nombre":"Redes 1","sigla":"INF433","paralelos":[{"grupo":"SB","docente":"Monrroy Dipp Victor Fernando","cupos":4,"horario":[{"dia":"mar","hora_inicio":"9:15","hora_fin":"11:30"},{"dia":"jue","hora_inicio":"9:15","hora_fin":"11:30"}]},{"grupo":"SA","docente":"Gonzales Sandoval Jorge Antonio","cupos":1,"horario":[{"dia":"lu","hora_inicio":"19:45","hora_fin":"21:15"},{"dia":"mie","hora_inicio":"19:45","hora_fin":"21:15"},{"dia":"vie","hora_inicio":"19:45","hora_fin":"21:15"}]},{"grupo":"SC","docente":"Villagomez Melgar Junior","cupos":20,"horario":[{"dia":"lu","hora_inicio":"19:00","hora_fin":"20:30"},{"dia":"mie","hora_inicio":"19:00","hora_fin":"20:30"},{"dia":"vie","hora_inicio":"19:00","hora_fin":"20:30"}]}]},{"nombre":"Sistemas Operativos 2","sigla":"INF413","paralelos":[{"grupo":"SA","docente":"Sanchez Velasco Enrique","cupos":40,"horario":[{"dia":"lu","hora_inicio":"8:30","hora_fin":"10:00"},{"dia":"mie","hora_inicio":"8:30","hora_fin":"10:00"},{"dia":"vie","hora_inicio":"8:30","hora_fin":"10:00"}]},{"grupo":"SB","docente":"Calle Terrazas Edwin","cupos":14,"horario":[{"dia":"lu","hora_inicio":"13:00","hora_fin":"15:15"},{"dia":"jue","hora_inicio":"13:00","hora_fin":"15:15"}]}]},{"nombre":"Sistemas de Información 2","sigla":"INF412","paralelos":[{"grupo":"SB","docente":"Martinez Canedo Rolando Antonio","cupos":12,"horario":[{"dia":"lu","hora_inicio":"16:45","hora_fin":"18:15"},{"dia":"mie","hora_inicio":"16:45","hora_fin":"18:15"},{"dia":"vie","hora_inicio":"16:45","hora_fin":"18:15"}]},{"grupo":"SA","docente":"Garzon Cuellar Angelica","cupos":30,"horario":[{"dia":"mar","hora_inicio":"7:00","hora_fin":"9:00"},{"dia":"jue","hora_inicio":"7:00","hora_fin":"9:00"},{"dia":"vie","hora_inicio":"7:00","hora_fin":"9:00"}]}]}]}]';
// const parsedData: Semestre[] = JSON.parse(data) as Semestre[];


@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss']
})
export class EnrollmentsComponent implements OnInit {
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
