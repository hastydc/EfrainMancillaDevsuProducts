import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.sass',
})
export class TooltipComponent {
  @Input() text: string = '';
}
