import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from '../input-text/input-text.component';
import { InputSelectComponent } from '../input-select/input-select.component';
import { InputNumberComponent } from '../input-number/input-number.component';
import { InputTextAreaComponent } from '../input-textarea/input-textarea.component';
import { InputButtonComponent } from '../input-button/input-button.component';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { Mode } from '../../enums/enum';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    InputButtonComponent,
    InputTextComponent,
    InputSelectComponent,
    InputNumberComponent,
    InputTextAreaComponent,
  ],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent {
  Mode = Mode;
  
  @Input() productForm!: FormGroup;
  @Input() categoryOptions: any[] = [];
  @Input() formErrorMessages: any;

  @Input() mode: Mode.CREATE | Mode.UPDATE = Mode.CREATE;
  isDemoMode = false;

  constructor(private authService: AuthService) {
    this.isDemoMode = this.authService.isDemoMode();
  }

  @Output() submitForm = new EventEmitter<void>();
  @Output() cancelForm = new EventEmitter<void>();

  onSubmit() {
    this.submitForm.emit();
  }

  onCancel() {
    this.cancelForm.emit();
  }

  get f() {
    return this.productForm.controls as {
      [key: string]: FormControl;
    };
  }
}
