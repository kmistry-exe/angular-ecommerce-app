import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationMessages } from '../../enums/enum';

@Component({
  selector: 'app-input-error',
  imports: [CommonModule],
  templateUrl: './input-error.component.html'
})

export class InputErrorComponent {
  @Input() control!: AbstractControl | null;

  @Input() requiredMessage: string = ValidationMessages.REQUIRED;
  @Input() emailMessage: string = ValidationMessages.EMAIL;
  @Input() minlengthMessage: string = ValidationMessages.MIN_LENGTH;
  @Input() minMessage: string = ValidationMessages.MIN_VALUE;
}