import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bill-title',
  templateUrl: './bill-title.component.html',
  styleUrls: ['./bill-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillTitleComponent {
  @Input() title: string;
  @Input() isRefreshing = false;
  @Output() onRefresh: EventEmitter<void> = new EventEmitter();

  refresh() {
    this.onRefresh.emit();
  }
}
