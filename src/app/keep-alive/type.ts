import {SimpleChange} from "@angular/core";

export interface OnActivated {
  onActivated(): void;
}
export interface OnDeactivated {
  onDeactivated(): void;
}

export interface DyComponent extends OnActivated, OnDeactivated{
  [key: string]: any;
}

export type TypedSimpleChanges<T> = {
  [P in keyof T]?: SimpleChange;
};

export interface KeepAlive {
  max: number;
}
