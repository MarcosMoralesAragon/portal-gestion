import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getDate(date: Date) : string{
    return date.getDate() + " / " + 
      this.parseMonth(date.getMonth()) + " / " + 
      date.getFullYear()
  }

  parseMonth(month : number) : string{
    month =+ 1;
    return month.toString();
  }

}
