import { signal, WritableSignal } from '@angular/core';

export class BaseStore<T> {
    items: WritableSignal<T[]> = signal<T[]>([]);
    isLoaded = false;

    load(newItems: T[]) {
        this.isLoaded = true;
        this.setAll(newItems);
    }

    unload() {
        this.isLoaded = false;
        this.clear();
    }

    setAll(newItems: T[]) {
        this.items.set(newItems);
    }

    add(item: T) {
        this.items.update((items) => [...items, item]);
    }

    update(predicate: (item: T) => boolean, updatedItem: T) {
        this.items.update((items) =>
            items.map((item) => (predicate(item) ? updatedItem : item)),
        );
    }

    remove(predicate: (item: T) => boolean) {
        this.items.update((items) => items.filter((i) => !predicate(i)));
    }

    clear() {
        this.items.set([]);
    }
}
