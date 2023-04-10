import { Pipe, PipeTransform } from '@angular/core';
import { Pdf } from './pdf';

@Pipe({
  name: 'pdfFilter'
})
export class PdfFilterPipe implements PipeTransform {

  transform(value: Pdf[], filterText?: string): Pdf[] {
    filterText = filterText? filterText.toLocaleLowerCase():null

    return filterText?value.filter((p:Pdf)=>p.title.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }

}
