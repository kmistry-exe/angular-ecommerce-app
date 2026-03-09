import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-state',
  imports: [CommonModule],
  templateUrl: './error-state.component.html',
})
export class ErrorStateComponent {
  @Input() message: string = 'Something went wrong';
}
