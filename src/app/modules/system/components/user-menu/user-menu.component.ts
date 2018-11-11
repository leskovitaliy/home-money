import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent {
  @Input() isOpen = false;
  @Input() userName = '';

  @Output() onLogout: EventEmitter<void> = new EventEmitter();

  logout() {
    this.onLogout.emit();
  }
}
