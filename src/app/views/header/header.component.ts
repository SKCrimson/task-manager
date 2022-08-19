import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SettingsDialogComponent} from "../../dialog/settings-dialog/settings-dialog.component";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  categoryName!: string;

  @Output()
  toggleMenu = new EventEmitter();

  showStat!: boolean;
  @Output()
  toggleStat = new EventEmitter<boolean>();

  @Output()
  help = new EventEmitter();

  isMobile!: boolean;

  constructor(private dialog: MatDialog, private deviceService: DeviceDetectorService) {
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit(): void {
    this.onToggleStat();
  }

  onToggleStat() {
    this.showStat = !this.showStat;
    this.toggleStat.emit(this.showStat);
  }

  showSettings() {
    const dialogRef = this.dialog.open(SettingsDialogComponent,
      {autoFocus: false, width: '500px'});
  }

  showHelp() {
    this.help.emit();
  }

  onToggleMenu() {
    this.toggleMenu.emit();
  }
}
