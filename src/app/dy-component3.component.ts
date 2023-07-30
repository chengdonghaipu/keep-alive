import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dy-component3',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      dy-component3 works!
    </p>
  `,
  styles: [
  ]
})
export class DyComponent3Component {
  constructor() {
    console.log('DyComponent3Component');
  }
}
