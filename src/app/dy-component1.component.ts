import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dy-component1',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      count: {{count}}
    </p>
    <button (click)="addCount()">+</button>
  `,
  styles: [
  ]
})
export class DyComponent1Component {
  count = 0;

  addCount() {
    this.count ++;
  }
}
