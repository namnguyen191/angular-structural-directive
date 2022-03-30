import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

class HideAfterContext {
  public get $implicit() {
    return this.angularStructuralDirectiveHideAfter;
  }
  // need to match the directive input for the "as" to work
  public angularStructuralDirectiveHideAfter = 1000;
  public counter = 0;
}

@Directive({
  selector: '[angularStructuralDirectiveHideAfter]',
})
export class HideAfterDirective implements OnInit {
  private _delay = 0;

  @Input('angularStructuralDirectiveHideAfter')
  set delay(newDelay: number | null) {
    if (newDelay) {
      this._delay = newDelay;
      this.context.counter = newDelay / 1000;
      this.context.angularStructuralDirectiveHideAfter = newDelay / 1000;
    }
  }

  get delay(): number {
    return this._delay;
  }

  @Input('angularStructuralDirectiveHideAfterThen')
  placeHolder: TemplateRef<HideAfterContext> | null = null;

  private context = new HideAfterContext();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<HideAfterContext>
  ) {}

  static ngTemplateContextGuard(
    dir: HideAfterDirective,
    ctx: unknown
  ): ctx is HideAfterContext {
    return true;
  }

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);

    const intervalId = setInterval(() => {
      this.context.counter--;
    }, 1000);
    setTimeout(() => {
      this.viewContainerRef.clear();
      clearInterval(intervalId);
      if (this.placeHolder) {
        this.viewContainerRef.createEmbeddedView(
          this.placeHolder,
          this.context
        );
      }
    }, this.delay);
  }
}
