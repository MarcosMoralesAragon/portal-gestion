import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getDate(date: Date) : string{
    
    return (date.getUTCDate() + 1) + " / " + 
      this.parseMonth(date.getUTCMonth()) + " / " + 
      date.getUTCFullYear()
  }

  parseMonth(month : number) : string{
    month ++;
    return month.toString();
  }

}
