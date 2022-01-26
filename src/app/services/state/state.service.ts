import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  getStateToString(state : number): string {
    var stateInString : string = ""
    switch (state) {
      case 0:
         stateInString = "Alta"
        break;
      case 1:
        stateInString = "Baja"
        break;
    
      case 2:
        stateInString = "En tramite"
        break;
      default:
        break;
    }

    return stateInString
  }

}
