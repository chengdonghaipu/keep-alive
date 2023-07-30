import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dy-component2',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      dy-component2 works!
    </p>
  `,
  styles: [
  ]
})
export class DyComponent2Component {
  constructor() {
    console.log('DyComponent2Component');
  }
}
