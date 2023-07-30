import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WithKeepAlive} from "./keep-alive/type";

@Component({
  selector: 'app-dy-component1',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span>
      count: {{count}}
    </span>
    <button (click)="addCount()">+</button>
    <p></p>
  `,
  styles: [
  ]
})
export class DyComponent1Component implements WithKeepAlive {
  count = 0;

  keepAlive = true;

  addCount() {
    this.count ++;
  }

  constructor() {
    console.log('DyComponent1Component');
  }
}
