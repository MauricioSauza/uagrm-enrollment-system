import { Component, OnInit } from '@angular/core';
import { MakePdfService } from 'src/app/services/make-pdf.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pantalla-imprimir',
  template: `
  <button (click)="generarPDFs()">Generar PDFs</button>
`,
  styleUrls: ['./pantalla-imprimir.component.scss']
})
export class PantallaImprimirComponent implements OnInit{
  paralelos: any[];
  constructor(private route: ActivatedRoute, private pdfService: MakePdfService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const paralelos = JSON.parse(params['paralelos']);
      console.log(paralelos); // muestra los paralelos en la consola
    });
  }

  generarPDFs() {
    const gruposSeleccionados = this.paralelos;
    this.pdfService.generarPDFs(gruposSeleccionados);
  }
}
