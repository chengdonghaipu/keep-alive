import {Component, ElementRef, Input, OnDestroy, OnInit, Type, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dy-component',
  template: `
    <ng-container #container>
      <!-- Component content will be rendered here -->
    </ng-container>
  `,
  styles: [
  ]
})
export class DyComponentComponent implements OnInit, OnDestroy {
  @Input() is!: Type<any>

  @ViewChild('container', { read: ElementRef }) container!: ElementRef;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.replaceWith(this.container.nativeElement);
  }

  ngOnDestroy() {
    this.elementRef.nativeElement?.remove();
  }
}
