import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roomfilter'
})
export class RoomfilterPipe implements PipeTransform {

  transform(roomtypelist: any[], ishabitable: boolean): any {
    if(ishabitable){
      return roomtypelist.filter(x => 
        x.ishabitable
      );
    }
    return roomtypelist.filter(x => 
      !x.ishabitable
    );

  }

}
