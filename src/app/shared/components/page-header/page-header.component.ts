import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { InputButtonComponent } from '../input-button/input-button.component';

@Component({
  selector: 'app-page-header',
  imports: [NgIf, InputButtonComponent],
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() viewAction?: boolean;
  @Output() view = new EventEmitter<void>();

  onView() {
    this.view.emit();
  }
}
