import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

export type Loaded<T> = { type: 'loaded'; data: T };
export type Loading = { type: 'loading' };
export type LoadingState<T> = Loaded<T> | Loading;

export interface Person {
  name: string;
}

@Directive({
  selector: '[angularStructuralDirectiveIfLoaded]',
})
export class IfLoadedDirective<T> {
  @Input('angularStructuralDirectiveIfLoaded') set state(
    state: LoadingState<T>
  ) {
    if (state.type === 'loaded') {
      // when we reach this part, the state is always Loaded and not Loading | Loaded
      // so the state in templateRef should be Loaded
      // using the static guard bellow, we basically help the compiler understand that
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  // after the "_" is the input name
  static ngTemplateGuard_angularStructuralDirectiveIfLoaded<T>(
    dir: IfLoadedDirective<T>,
    expr: LoadingState<T>
  ): expr is Loaded<T> {
    return true;
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}
}
