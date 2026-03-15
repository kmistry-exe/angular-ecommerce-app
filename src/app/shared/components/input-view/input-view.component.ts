import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-view',
  imports: [CommonModule],
  templateUrl: './input-view.component.html',
})
export class InputViewComponent {
  @Input() label: string = '';
  @Input() value: any = '';
}
