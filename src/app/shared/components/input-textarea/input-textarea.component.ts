import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputErrorComponent } from '../input-error/input-error.component';
import { ValidationMessages } from '../../enums/enum';

@Component({
  selector: 'app-textarea',
  imports: [CommonModule, ReactiveFormsModule, InputErrorComponent],
  templateUrl: './input-textarea.component.html',
})

export class InputTextAreaComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: 'textarea' = 'textarea';

  @Input({ required: true }) control!: FormControl;

  @Input() requiredMessage: string = ValidationMessages.REQUIRED;
}