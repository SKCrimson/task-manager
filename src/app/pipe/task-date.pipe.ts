import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'taskDate'
})
export class TaskDatePipe implements PipeTransform {

  private readonly datepipe: DatePipe = new DatePipe('ru-RU');

  private readonly currentDate!: string | null;
  private readonly yesterday!: string | null;
  private readonly tomorrow!: string | null;

  constructor() {
    let currentDate = new Date();
    this.currentDate = this.datepipe.transform(currentDate, 'dd-MMM-YYYY')

    let yesterday = this.addDays(currentDate, -1);
    this.yesterday = this.datepipe.transform(yesterday, 'dd-MMM-YYYY')

    let tomorrow = this.addDays(new Date(), 1);
    this.tomorrow = this.datepipe.transform(tomorrow, 'dd-MMM-YYYY')
  }

  transform(date: Date | string, format: string = 'fullDate'): string | null {

    if (date == undefined)
      return '';

    date = new Date(date);
    let dateWithoutTime = this.datepipe.transform(date, 'dd-MMM-YYYY')

    if (dateWithoutTime == this.currentDate)
      return 'Сегодня';

    if (dateWithoutTime == this.yesterday)
      return 'Вчера';

    if (dateWithoutTime == this.tomorrow)
      return 'Завтра';

    return this.datepipe.transform(date, format);
  }

  private addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);

    return date;
  }
}
