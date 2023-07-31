import {
  Component, ComponentRef,
  ElementRef,
  Injector,
  Input, OnChanges,
  OnDestroy,
  OnInit, Type, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {DyComponent, TypedSimpleChanges} from "./type";

interface DyView {
  component: Type<DyComponent>;
  componentRef: ComponentRef<DyComponent>;
}

/**
 * 执行缓存实例生命周期
 * @param componentRef
 */
function executeOnActivated(componentRef: ComponentRef<DyComponent>) {
  componentRef.instance.onActivated && componentRef.instance.onActivated();
}
/**
 * 执行缓存实例生命周期
 * @param componentRef
 */
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
  // 组件类
  @Input() is!: Type<any>
  // 控制缓存实例个数上限 默认不限制
  @Input() max: number = Infinity;
  // 用于去除自定义标签app-keep-alive
  @ViewChild('container', { read: ElementRef, static: true }) container!: ElementRef;

  #cacheView: DyView[] = [];

  #currentViewRef?: ComponentRef<DyComponent>;

  constructor(private elementRef: ElementRef,
              private readonly viewContainerRef: ViewContainerRef,
              private readonly injector: Injector,) {}

  ngOnInit() {
    // 替换自定义标签
    this.elementRef.nativeElement.replaceWith(this.container.nativeElement);
  }

  ngOnChanges(changes: TypedSimpleChanges<KeepAliveComponent>) {
    if (changes.is) {
      this.isChange(changes.is?.previousValue, changes.is?.currentValue);
    }
  }

  private activate(currentValue: Type<any>) {
    if (this.#currentViewRef) {
      // 卸载视图 执行缓存实例生命周期
      executeOnDeactivated(this.#currentViewRef);
      this.viewContainerRef.detach();
    }

    // 从缓存中获取view
    const view = this.#cacheView.find(value => value.component === currentValue);

    if (view) {
      // 已经渲染过了
      const keepAlive = view.componentRef.instance.keepAlive ?? true;

      if (!keepAlive) {
        // 如果不需要缓存 直接将之前缓存了的去除掉即可
        this.#cacheView = this.#cacheView.filter(value => value.component !== currentValue)
      } else {
        // 执行缓存实例生命周期
        executeOnActivated(view.componentRef);
        // 将缓存的视图重新插入到DOM树中
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

    // 执行缓存实例生命周期
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

