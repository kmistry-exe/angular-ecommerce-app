import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, HostListener } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputErrorComponent } from '../input-error/input-error.component';
import { ValidationMessages } from '../../enums/enum';

interface SelectOption {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-select',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputErrorComponent,
  ],
  templateUrl: './input-select.component.html',
})
export class InputSelectComponent implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input({ required: true }) control!: FormControl;
  @Input() options: SelectOption[] = [];

  @Input() requiredMessage: string = ValidationMessages.REQUIRED;

  @Input() searchable: boolean = false;
  @Input() disabled: boolean = false;

  filteredOptions: SelectOption[] = [];
  searchText: string = '';
  dropdownOpen = false;

  ngOnInit(): void {
    this.filteredOptions = this.options;

    const selected = this.options.find((o) => o.value === this.control.value);

    if (selected) {
      this.searchText = selected.label;
    }
  }

  toggleDropdown(): void {
    if (this.control.disabled) return;
    this.dropdownOpen = !this.dropdownOpen;
  }

  filterOptions(): void {
    const value = this.searchText.toLowerCase();

    this.filteredOptions = this.options.filter((option) =>
      option.label.toLowerCase().includes(value),
    );
  }

  selectOption(option: SelectOption): void {
    this.control.setValue(option.value);
    this.control.markAsTouched();
    this.control.markAsDirty();

    this.searchText = option.label;
    this.dropdownOpen = false;
  }

  getSelectedLabel(): string {
    const selected = this.options.find((o) => o.value === this.control.value);
    return selected ? selected.label : '';
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: any) {
    if (!event.target.closest('.select-wrapper')) {
      this.dropdownOpen = false;
    }
  }

  openDropdown(): void {
    if (this.control.disabled) return;
    this.dropdownOpen = true;
  }

  handleBlur(): void {
    this.control.markAsTouched();
  }
}
