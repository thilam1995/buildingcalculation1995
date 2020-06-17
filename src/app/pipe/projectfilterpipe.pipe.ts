import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectfilterpipe'
})
export class ProjectfilterpipePipe implements PipeTransform {

  transform(projectlist: any[], searchproject: string): any {
    if(!projectlist || !searchproject){
      projectlist.sort((a, b) => {
        return (a.data.ProjectName > b.data.ProjectName) ? 1 : ((b.data.ProjectName > a.data.ProjectName) ? -1 : 0)
      });
      return projectlist;
    }
    return projectlist.filter(x => 
      x.data.ProjectName.toLowerCase().indexOf(searchproject.toLowerCase()) !== -1);
  }

}
