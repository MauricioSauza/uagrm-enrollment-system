import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { LecturesService } from 'src/app/services/lectures.service';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponentComponent } from '../modal-component/modal-component.component';


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
  faCircleInfo = faCircleInfo;
  
  constructor(
    private lecturesService: LecturesService,
    public dialog: MatDialog
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
