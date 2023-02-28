import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root'
})
export class MakePdfService {

  constructor() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }
   generarPDFs(gruposSeleccionados: any[]) {
    // Lógica para generar los PDFs personalizados
    const docDefinition = {
      content: [
        { text: 'PDF 1', fontSize: 15 },
        { text: 'Grupos seleccionados:', fontSize: 10 },
        gruposSeleccionados.map((grupo) => {
          return { text: grupo.paralelos.nombre };
        })
      ]
    };
    pdfMake.createPdf(docDefinition).download();

    const docDefinition2 = {
      content: [
        { text: 'PDF 2', fontSize: 15 },
        { text: 'Grupos seleccionados:', fontSize: 10 },
        gruposSeleccionados.map((grupo) => {
          return { text: grupo.nombre };
        })
      ]
    };
    pdfMake.createPdf(docDefinition2).download();
  }
}
