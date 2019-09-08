import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectfilterpipe'
})
export class ProjectfilterpipePipe implements PipeTransform {

  transform(projectlist: any[], searchProject: string): any {
    if(!projectlist || !searchProject){
      return projectlist;
    }
    return projectlist.filter(x => 
      x.data.ProjectName.toLowerCase().indexOf(searchProject.toLowerCase()) !== -1);
  }

}
