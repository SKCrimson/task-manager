import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'taskDate'
})
export class TaskDatePipe implements PipeTransform {

  transform(date: Date | string, format: string = 'mediumDate'): string | null {

    if (date == null) {
      return '';
    }

    date = new Date(date);
    const currentDate = new Date();

    if (date == currentDate)
      return 'Сегодня';

    const date1 = this.addDays(currentDate, -1);

    if (date == date1)
      return 'Вчера';

    const date2 = this.addDays(currentDate, 1);

    if (date == date2)
      return 'Завтра';

    return new DatePipe('ru-RU').transform(date, format);
  }

  private addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }
}
