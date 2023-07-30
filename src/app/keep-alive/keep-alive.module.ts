import {InjectionToken, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import { CommonModule } from '@angular/common';
import {KeepAliveComponent} from "./keep-alive.component";



@NgModule({
  declarations: [
    KeepAliveComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    KeepAliveComponent,
  ]
})
export class KeepAliveModule {
}
