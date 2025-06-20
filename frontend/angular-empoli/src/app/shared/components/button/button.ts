import { Component, computed, input } from '@angular/core';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'destructive'
  | 'ghost';

@Component({
  selector: 'brk-button, button[brkBtn], a[brkBtn]',
  template: `
    <span class="content" [hidden]="loading()">
      <ng-content select="icon" /><span><ng-content /></span>
    </span>
    <span class="loading" [hidden]="!loading()">
      <svg
        class="animate-spin"
        style="width: 1.25rem; height: 1.25rem"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>
  `,
  host: {
    '[class]': 'hostClasses()',
    '[attr.disabled]': 'loading() || disabled() ? true : null',
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

      :host([disabled]) {
        cursor: not-allowed;
        opacity: 0.7;
      }

      .content {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }

      .loading {
        display: inline-flex;
        align-items: center;
      }

      .animate-spin {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class Button {
  variant = input<ButtonVariant>('primary');
  loading = input(false);
  disabled = input(false);

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
