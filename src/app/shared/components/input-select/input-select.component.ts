import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputErrorComponent } from '../input-error/input-error.component';
import { ValidationMessages } from '../../enums/enum';
import { Subscription } from 'rxjs';

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
export class InputSelectComponent implements OnInit, OnChanges, OnDestroy {
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
  private sub?: Subscription;

  ngOnInit(): void {
    this.filteredOptions = this.options;
    this.updateSearchText();

    this.sub = this.control.valueChanges.subscribe(() => {
      this.updateSearchText();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.filteredOptions = this.options;
      this.updateSearchText();
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  updateSearchText(): void {
    const selected = this.options.find((o) => o.value === this.control.value);
    if (selected) {
      this.searchText = selected.label;
    } else if (!this.control.value) {
      this.searchText = '';
    }
  }

  toggleDropdown(): void {
    if (this.control.disabled) return;
    this.dropdownOpen = !this.dropdownOpen;
    if (this.dropdownOpen) {
      this.filteredOptions = this.options;
    }
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
    this.filteredOptions = this.options;
  }

  handleBlur(): void {
    this.control.markAsTouched();
    this.updateSearchText();
  }
}
