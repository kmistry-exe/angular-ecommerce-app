import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputErrorComponent } from '../input-error/input-error.component';

@Component({
  selector: 'app-number',
  imports: [CommonModule, ReactiveFormsModule, InputErrorComponent],
  templateUrl: './input-number.component.html',
})
export class InputNumberComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';

  @Input({ required: true }) control!: FormControl;

  @Input() requiredMessage: string = 'This field is required';
  @Input() minMessage: string = 'Value is below allowed minimum';
}
