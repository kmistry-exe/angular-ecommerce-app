import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessages } from '../../enums/enum';

@Component({
  selector: 'app-yesNo',
  templateUrl: './input-radio.component.html'
})
export class InputRadioComponent {
  @Input() label: string = '';
  @Input({ required: true }) control!: FormControl;
  @Input() required: boolean = false;

  @Input() requiredMessage: string = ValidationMessages.REQUIRED;
}