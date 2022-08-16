import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  categoryName!: string;

  showStat!: boolean;

  @Output()
  toggleStat = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
    this.onToggleStat();
  }

  onToggleStat() {
    this.showStat = !this.showStat;
    this.toggleStat.emit(this.showStat);
  }
}
