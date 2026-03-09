import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputErrorComponent } from '../input-error/input-error.component';
import { ValidationMessages } from '../../enums/enum';

@Component({
  selector: 'app-select',
  imports: [CommonModule, ReactiveFormsModule, InputErrorComponent],
  templateUrl: './input-select.component.html',
})
export class InputSelectComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';

  @Input({ required: true }) control!: FormControl;
  @Input() options: { label: string; value: string }[] = [];

  @Input() requiredMessage: string = ValidationMessages.REQUIRED;
}
