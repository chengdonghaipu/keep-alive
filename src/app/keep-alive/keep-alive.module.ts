import {InjectionToken, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import { CommonModule } from '@angular/common';
import {KeepAliveComponent} from "./keep-alive.component";
import { DyComponentComponent } from './dy-component.component';



@NgModule({
  declarations: [
    KeepAliveComponent,
    DyComponentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    KeepAliveComponent
  ]
})
export class KeepAliveModule {
}
