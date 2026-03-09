import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ValidationMessages } from '../../enums/enum';
import { CommonModule } from '@angular/common';
import { InputErrorComponent } from '../input-error/input-error.component';

@Component({
  selector: 'app-yesNo',
  imports: [CommonModule, ReactiveFormsModule, InputErrorComponent],
  templateUrl: './input-radio.component.html',
})
export class InputRadioComponent {
  @Input() label: string = '';
  @Input({ required: true }) control!: FormControl;
  @Input() required: boolean = false;

  @Input() requiredMessage: string = ValidationMessages.REQUIRED;
}
