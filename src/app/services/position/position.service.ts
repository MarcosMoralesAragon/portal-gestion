import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor() { }

  getPositionToString(position : string): string{
    var positionInString : string = ""
    switch (position) {
      case "Executive":
        positionInString = "Directivo"
        break;
      case "Officer":
        positionInString = "Oficial"
        break;
    
      case "Worker":
        positionInString = "Operario"
        break;

      case "Technician":
        positionInString = "Tecnico"
        break;

      default:
        break;
    }
    return positionInString
  }
}
