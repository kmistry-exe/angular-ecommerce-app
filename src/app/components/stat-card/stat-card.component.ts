import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-stat-card',
    imports: [CommonModule],
    templateUrl: './stat-card.component.html',
})

export class StatCardComponent {
    @Input({ required: true }) label!: string;
    @Input({ required: true }) value!: number;
    @Input() prefix?: string;
}