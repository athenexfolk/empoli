import { Injectable } from '@angular/core';
import { Toggler } from '../../shared/utils/toggler';

@Injectable({
    providedIn: 'root',
})
export class SidebarService {
    sidebar = new Toggler();
}
