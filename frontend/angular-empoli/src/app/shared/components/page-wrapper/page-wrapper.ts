import { Component, input } from '@angular/core';

@Component({
  selector: 'page-wrapper',
  template: `
    @if (pageTitle()) {
      <h1 class="mb-6 text-3xl font-bold">{{ pageTitle() }}</h1>
    }
    <ng-content />
  `,
  host: {
    class: 'p-6 max-w-4xl mx-auto',
  },
  styles: `
    :host {
      display: block;
    }
  `,
})
export class PageWrapper {
  pageTitle = input<string>();
}
