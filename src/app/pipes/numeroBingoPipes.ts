import { Pipe } from '@angular/core';

@Pipe({
  name: 'numeroBingo'
})
export class NumeroBingoPipe {
  transform(val:number) {
    if (val === -1) {
      return '';
    }
    return val

  }
}