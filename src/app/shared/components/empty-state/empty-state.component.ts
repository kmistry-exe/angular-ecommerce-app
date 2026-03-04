import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-empty-state',
    imports: [CommonModule],
    templateUrl: './empty-state.component.html',
})

export class EmptyStateComponent {
    @Input() title: string = 'No data found';
    @Input() description: string = '';
}