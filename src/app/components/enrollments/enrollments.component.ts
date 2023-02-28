import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ILectures, IParallels } from 'src/app/interfaces/materias-interfaces';
import { LecturesService } from 'src/app/services/lectures.service';
import { ModalComponentComponent } from '../modal-component/modal-component.component';
import { ActivatedRoute, Router } from '@angular/router';


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
    private route: ActivatedRoute,
    private lecturesService: LecturesService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getLectures();
    console.log(this.lecturesPicked);
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
    if (event.previousContainer.data !== event.container.data) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      const cantMaterias8Sem = event.container.data.filter(item => item.semestre === 8).length;
      if (cantMaterias8Sem >= 3) {
        this.openModal("Error", "Haz alcanzado el limite de materias de levantamiento permitidas");
      }
    }
  }
  openModal(titulo: string, contenido: string) {
    const dialogRef = this.dialog.open(ModalComponentComponent);
    dialogRef.componentInstance.titulo = titulo;
    dialogRef.componentInstance.contenido = contenido;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  verPDF(): void {
    // ... código para obtener los grupos seleccionados
    const paralelos = JSON.stringify(this.lecturesPicked)[0] as unknown as { paralelos: any[] };
    this.router.navigate(['/imprimir'], { queryParams: { grupos: JSON.stringify(this.lecturesPicked) } });
  }
}