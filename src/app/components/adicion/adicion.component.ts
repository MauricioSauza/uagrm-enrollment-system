import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { LecturesService } from 'src/app/services/lectures.service';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponentComponent } from '../modal-component/modal-component.component';
import { ILectures, IParallels } from 'src/app/interfaces/materias-interfaces';


@Component({
  selector: 'app-adicion',
  templateUrl: './adicion.component.html',
  styleUrls: ['./adicion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdicionComponent implements OnInit {
  public materias: ILectures[];
  public enrollments: ILectures[];
  public lecturesWithEnrollments: ILectures[];
  public lecturesPicked: ILectures[] = [{
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
    private lecturesService: LecturesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getLectures();
    this.getEnrollments();
    this.getLecturesWithEnrollments();
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

  private getEnrollments() {
    this.lecturesService.getEnrollments().subscribe((response: any) => {
      this.enrollments = response.map(function (item: any) {
        return {
          disabled: true,
          nombre: item.nombre,
          sigla: item.sigla,
          semestre: item.semestre,
          paralelos: item.paralelos
        }
      });
    });
  };

  private getLecturesWithEnrollments() {
    this.lecturesService.getLecturesWithEnrollment().subscribe((response: any) => {
      this.lecturesWithEnrollments = response.map(function (item: any) {
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
      const cantMaterias8Sem = event.container.data.filter(item => item.semestre === 8).length;
      if (cantMaterias8Sem >= 3) {
        this.openModal("Error", "Haz alcanzado el limite de materias de levantamiento permitidas");
      }
    } 
}
  openModal(titulo: string , contenido:string ) {
    const dialogRef = this.dialog.open(ModalComponentComponent);
    dialogRef.componentInstance.titulo = titulo;
    dialogRef.componentInstance.contenido = contenido;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(ModalComponentComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
