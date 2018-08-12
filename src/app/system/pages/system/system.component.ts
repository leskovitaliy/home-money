import { Component, HostBinding, OnInit } from '@angular/core';
import { fadeStateTrigger } from '../../../shared/animations/fade.animations';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  animations: [fadeStateTrigger]
})
export class SystemComponent implements OnInit {
  @HostBinding('@fade') a = true;
  constructor() { }

  ngOnInit() {
  }

}
