import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Icon } from '../../../shared/components/icon/icon';

@Component({
    selector: 'app-toast',
    imports: [Icon],
    templateUrl: './toast.html',
    styleUrl: './toast.css',
    animations: [
        trigger('toastAnim', [
            transition(':enter', [
                style({ transform: 'translateY(-100%)', opacity: 0 }),
                animate(
                    '300ms cubic-bezier(.25,.8,.25,1)',
                    style({ transform: 'translateY(0)', opacity: 1 }),
                ),
            ]),
            transition(':leave', [
                animate(
                    '300ms cubic-bezier(.25,.8,.25,1)',
                    style({ opacity: 0 }),
                ),
            ]),
        ]),
    ],
})
export class Toast {
    protected readonly toastService = inject(ToastService);
}
