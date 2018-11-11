import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-events-options',
  templateUrl: './dropdown-events-options.component.html',
  styleUrls: ['./dropdown-events-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownEventsOptionsComponent {

  @Output() changeEvent: EventEmitter<string> = new EventEmitter();

  selectItem(eventName: string) {
    this.changeEvent.emit(eventName);
  }

}
