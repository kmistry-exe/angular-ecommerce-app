import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { InputTextComponent } from '../input-text/input-text.component';
import { InputSelectComponent } from '../input-select/input-select.component';
import { InputNumberComponent } from '../input-number/input-number.component';
import { InputButtonComponent } from '../input-button/input-button.component';
import { Mode } from '../../enums/enum';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    InputTextComponent,
    InputSelectComponent,
    InputNumberComponent,
    InputButtonComponent,
  ],
  templateUrl: './order-form.component.html',
})
export class OrderFormComponent {
  Mode = Mode;

  @Input() orderForm!: FormGroup;
  @Input() productOptions: any[] = [];
  @Input() statusOptions: any[] = [];
  @Input() formErrorMessages: any;

  @Input() mode: Mode.CREATE | Mode.UPDATE = Mode.CREATE;
  @Input() disabled: boolean = false;

  @Output() submitForm = new EventEmitter<void>();
  @Output() cancelForm = new EventEmitter<void>();

  onSubmit() {
    this.submitForm.emit();
  }

  onCancel() {
    this.cancelForm.emit();
  }

  get f() {
    return this.orderForm.controls as {
      [key: string]: FormControl;
    };
  }
}
