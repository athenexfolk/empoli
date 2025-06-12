import { Component, input } from '@angular/core';

@Component({
  selector: 'i[sortIndicator]',
  template: 'north',
  host: {
    class: 'ms small transition-all duration-300',
    '[class.rotate-x-180]': 'direction() === "desc"',
  },
})
export class SortIndicator {
  direction = input<SortDirection>('asc');
}
