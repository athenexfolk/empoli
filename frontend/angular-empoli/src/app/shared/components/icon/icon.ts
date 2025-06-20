import { Component, input } from '@angular/core';

@Component({
  selector: 'icon',
  template: `{{ name() }}`,
  host: {
    class: 'ms',
  },
})
export class Icon {
  name = input.required<string>();
}
