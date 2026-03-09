import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputErrorComponent } from '../input-error/input-error.component';
import { ValidationMessages } from '../../enums/enum';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text',
  imports: [CommonModule, ReactiveFormsModule, InputErrorComponent],
  templateUrl: './input-text.component.html',
})
export class InputTextComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';

  @Input({ required: true }) control!: FormControl;

  @Input() requiredMessage: string = ValidationMessages.REQUIRED;
  @Input() emailMessage: string = ValidationMessages.EMAIL;
  @Input() minlengthMessage: string = ValidationMessages.MIN_LENGTH;
}
