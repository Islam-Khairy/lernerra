import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from '../../interfaces/course/icourse';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {

  transform(list:ICourse[],searchInput:string): ICourse[] {

    return list.filter((i:ICourse) => {return i.name.toLowerCase().includes(searchInput.toLowerCase())});
  }

}
