import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor() { }

  getPositionToString(position : number): string{
    var positionInString : string = ""
    switch (position) {
      case 0:
        positionInString = "Directivo"
        break;
      case 1:
        positionInString = "Oficial"
        break;
    
      case 2:
        positionInString = "Operario"
        break;

      case 3:
        positionInString = "Tecnico"
        break;

      default:
        break;
    }
    return positionInString
  }
}
