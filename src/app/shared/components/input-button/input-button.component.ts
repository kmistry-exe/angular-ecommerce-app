import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-button',
    imports: [CommonModule],
    templateUrl: './input-button.component.html'
})

export class InputButtonComponent {
    @Input() label: string = '';
    @Input() variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';
    @Input() icon?: string;
    @Input() showIcon: boolean = true;
    @Input() iconOnly: boolean = false;
    @Input() disabled: boolean = false;
    @Input() type: 'button' | 'submit' = 'button';


    get variantClasses(): string {
        const base =
            'uppercase inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium leading-none transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

        const size = this.iconOnly
            ? 'h-8 w-8 flex items-center justify-center'
            : 'h-8 px-3 w-auto';

        const variants = {
            primary:
                'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]',
            secondary:
                'bg-gray-200 text-gray-800 hover:bg-gray-300 active:scale-[0.98]',
            danger:
                'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]',
            ghost:
                'bg-transparent text-gray-700 hover:bg-gray-100'
        };

        return `${base} ${size} ${variants[this.variant]}`;
    }
}