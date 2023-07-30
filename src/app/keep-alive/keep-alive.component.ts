import {
  Component, ComponentRef,
  ContentChild, ElementRef,
  Injector,
  Input, OnChanges,
  OnDestroy,
  OnInit, Type, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {DyComponent, KeepAlive, TypedSimpleChanges} from "./type";

interface DyView {
  component: Type<DyComponent>;
  componentRef: ComponentRef<DyComponent>;
}

function executeOnActivated(componentRef: ComponentRef<DyComponent>) {
  componentRef.instance.onActivated && componentRef.instance.onActivated();
}

function executeOnDeactivated(componentRef: ComponentRef<DyComponent>) {
  componentRef.instance.onDeactivated && componentRef.instance.onDeactivated();
}

@Component({
  selector: 'app-keep-alive',
  template: `
    <ng-container #container></ng-container>
  `,
  styles: [
  ]
})
export class KeepAliveComponent implements OnInit, OnDestroy, OnChanges {
  @Input() is!: Type<any>

  @Input() max: number = Infinity;

  @ViewChild('container', { read: ElementRef, static: true }) container!: ElementRef;

  #cacheView: DyView[] = [];

  #currentViewRef?: ComponentRef<DyComponent>;

  constructor(private elementRef: ElementRef,
              private readonly viewContainerRef: ViewContainerRef,
              private readonly injector: Injector,) {}

  ngOnInit() {
    this.elementRef.nativeElement.replaceWith(this.container.nativeElement);
  }

  ngOnChanges(changes: TypedSimpleChanges<KeepAliveComponent>) {
    if (changes.is) {
      this.isChange(changes.is?.previousValue, changes.is?.currentValue);
    }
  }

  private activate(currentValue: Type<any>) {
    if (this.#currentViewRef) {
      // 卸载视图
      executeOnDeactivated(this.#currentViewRef);
      this.viewContainerRef.detach();
    }

    const view = this.#cacheView.find(value => value.component === currentValue);

    if (view) {
      // 已经渲染过了
      const keepAlive = view.componentRef.instance.keepAlive ?? true;

      if (!keepAlive) {
        this.#cacheView = this.#cacheView.filter(value => value.component !== currentValue)
      } else {
        executeOnActivated(view.componentRef);
        this.viewContainerRef.insert(view.componentRef.hostView);
        return
      }
    }
    // 初次渲染
    const injector = Injector.create({
      providers: [],
      parent: this.injector
    });

    this.#currentViewRef = this.viewContainerRef.createComponent(currentValue, {
      injector,
      index: this.viewContainerRef.length
    });

    const keepAlive = this.#currentViewRef.instance.keepAlive ?? true;

    if (!keepAlive) {
      // 无需缓存!
      return;
    }

    executeOnActivated(this.#currentViewRef);

    Promise.resolve().then(() => {
      const max = this.max;

      if (this.#cacheView.length >= max) {
        this.#cacheView.shift();
      }

      this.#cacheView.push(<DyView>{
        component: currentValue,
        componentRef: this.#currentViewRef
      })
    })


  }

  isChange(previousValue: Type<any>, currentValue: Type<any>) {
    this.activate(currentValue);
  }

  ngOnDestroy() {
    this.elementRef.nativeElement?.remove();
  }
}

