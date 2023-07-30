import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {KeepAliveModule} from "./keep-alive/keep-alive.module";
import {DyComponent1Component} from "./dy-component1.component";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeepAliveModule,
    DyComponent1Component
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
