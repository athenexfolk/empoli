import { Injectable, signal } from '@angular/core';

type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastMessage = {
    title: string;
    message: string;
    type?: ToastType;
    duration?: number;
    date?: Date;
};

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    toasts = signal<ToastMessage[]>([]);

    push(
        title: string,
        message: string,
        type: ToastType = 'info',
        duration: number = 3000,
    ) {
        const timestamp = new Date();
        this.toasts.update((currentToasts) => {
            const updated = [
                ...currentToasts,
                { title, message, type, duration, date: timestamp },
            ];
            return updated.slice(-3);
        });

        setTimeout(() => this.remove(timestamp), duration);
    }

    remove(date: Date) {
        this.toasts.update((currentToasts) =>
            currentToasts.filter((toast) => toast.date !== date),
        );
    }
}
