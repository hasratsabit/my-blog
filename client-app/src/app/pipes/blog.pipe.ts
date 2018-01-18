import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blogPipe'
})
export class BlogPipe implements PipeTransform {

  transform(value: string, limit?: number): any {

    if(!value)
    return false;
    else {
      let actualLimit = (limit) ? limit : 200;
      return value.substr(0, actualLimit) + '...';
    }
  }

}
