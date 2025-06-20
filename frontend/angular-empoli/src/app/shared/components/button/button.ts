import { Component, computed, input } from '@angular/core';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'destructive'
  | 'ghost';

@Component({
  selector: 'brk-button, button[brkBtn], a[brkBtn]',
  template: `<ng-content select="icon" /><span><ng-content /></span>`,
  host: {
    '[class]': 'hostClasses()',
    role: 'button',
  },
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      }
    `,
  ],
})
export class Button {
  variant = input<ButtonVariant>('primary');

  variantClasses: Record<ButtonVariant, string> = {
    primary: 'brk-btn__primary',
    secondary: '',
    destructive: '',
    outline: '',
    ghost: 'brk-btn__ghost',
  };

  hostClasses = computed(() => {
    return this.variantClasses[this.variant()];
  });
}
