export class Toggler {
  private _active: boolean;

  get active() {
    return this._active;
  }

  constructor(active = false) {
    this._active = active;
  }

  toggle() {
    this._active = !this._active;
  }

  activate() {
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }
}
