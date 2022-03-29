import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[angularStructuralDirectiveHideAfter]',
})
export class HideAfterDirective implements OnInit {
  @Input('angularStructuralDirectiveHideAfter')
  delay = 0;

  @Input('angularStructuralDirectiveHideAfterThen')
  placeHolder: TemplateRef<any> | null = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    this.viewContainerRef.createEmbeddedView(this.templateRef);
    setTimeout(() => {
      this.viewContainerRef.clear();
      if (this.placeHolder) {
        this.viewContainerRef.createEmbeddedView(this.placeHolder);
      }
    }, this.delay);
  }
}
