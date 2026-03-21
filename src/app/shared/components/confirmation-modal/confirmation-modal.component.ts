import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputButtonComponent } from '../input-button/input-button.component';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-confirmation-modal',
  imports: [CommonModule, InputButtonComponent, PageHeaderComponent],
  templateUrl: './confirmation-modal.component.html',
})
export class ConfirmationModalComponent {
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed?';

  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';

  @Input() confirmVariant: 'primary' | 'danger' = 'primary';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  @Input() cancelIcon?: string = 'fa-xmark';
  @Input() confirmIcon?: string = 'fa-check';
  @Input() isConfirmDisabled = false;

  constructor() {}

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
