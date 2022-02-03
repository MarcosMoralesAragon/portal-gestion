import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  getStateToString(state : string): string {
    var stateInString : string = ""
    switch (state) {
      case "Working":
         stateInString = "Alta"
        break;
      case "Down":
        stateInString = "Baja"
        break;
    
      case "InProcess":
        stateInString = "En tramite"
        break;
      default:
        break;
    }

    return stateInString
  }

}
