import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-page-header',
  imports: [NgIf],
  templateUrl: './page-header.component.html',
})

export class PageHeaderComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
}
