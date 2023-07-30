import {AfterContentInit, Component, ContentChild, Injector, Input, ViewContainerRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DyComponentComponent} from "./dy-component.component";
import {KeepAlive} from "./type";

@Component({
  selector: 'app-keep-alive',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
  ]
})
export class KeepAliveComponent implements AfterContentInit, KeepAlive {
  @ContentChild(DyComponentComponent) dyComponent?: DyComponentComponent;

  @Input() max: number = Infinity;

  constructor() {
  }

  ngAfterContentInit() {
    this.dyComponent?.register(this)
    console.log(this.dyComponent);
  }
}
