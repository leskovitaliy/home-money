import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { fadeStateTrigger } from '../../../../shared/animations/fade.animations';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  animations: [fadeStateTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SystemComponent {
  isHideSideBar = false;

  @HostBinding('@fade') a = true;

  toggleSideBar(isOpen) {
    this.isHideSideBar = isOpen;
  }
}
