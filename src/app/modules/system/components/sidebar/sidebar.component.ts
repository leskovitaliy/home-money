import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isHideSidebar = false;
  @Output() toggleOpenSidebar: EventEmitter<any> = new EventEmitter();

  toggleOpen() {
    this.isHideSidebar = !this.isHideSidebar;
    this.toggleOpenSidebar.emit(this.isHideSidebar);
  }
}
