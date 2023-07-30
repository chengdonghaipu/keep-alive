import {Component, Type} from '@angular/core';
import {DyComponent1Component} from "./dy-component1.component";
import {DyComponent2Component} from "./dy-component2.component";
import {DyComponent3Component} from "./dy-component3.component";

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <app-keep-alive [max]="2">
      <app-dy-component [is]="component"></app-dy-component>
    </app-keep-alive>

    <button (click)="active(0)">激活组件1</button>
    <button (click)="active(1)">激活组件2</button>
    <button (click)="active(2)">激活组件3</button>
  `
})
export class AppComponent {
  component: Type<any> = DyComponent1Component;

  active(index: number) {
    const component = [DyComponent1Component, DyComponent2Component, DyComponent3Component]

    this.component = component[index];
  }
}
