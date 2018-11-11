import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyCardComponent {
  currencies: string[] = ['EUR', 'USD'];

  @Input() currency: any;
}
