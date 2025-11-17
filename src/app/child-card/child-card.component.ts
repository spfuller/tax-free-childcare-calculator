import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-child-card',
  imports: [],
  templateUrl: './child-card.component.html',
  styleUrl: './child-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block' },
})
export class ChildCardComponent {}
