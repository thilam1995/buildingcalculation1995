import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortbydate'
})
export class SortbydatePipe implements PipeTransform {

  transform(projectlist: any[]): any {
    return projectlist.sort((a, b) => 
      (a.DateModified > b.DateModified) ? 1 : -1
    );
  }

}
