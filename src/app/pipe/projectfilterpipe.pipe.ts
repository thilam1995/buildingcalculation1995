import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectfilterpipe'
})
export class ProjectfilterpipePipe implements PipeTransform {

  transform(projectlist: any[], searchproject: string): any {
    if(!projectlist || !searchproject){
      return projectlist;
    }
    return projectlist.filter(x => 
      x.data.ProjectName.toLowerCase().indexOf(searchproject.toLowerCase()) !== -1);
  }

}
