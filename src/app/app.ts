import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CalculatorComponent } from './calculator/calculator';

@Component({
  selector: 'app-root',
  imports: [CalculatorComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('tax-free-childcare-calculator');
}
