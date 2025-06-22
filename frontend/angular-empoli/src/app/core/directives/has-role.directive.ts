import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
    selector: '[hasRole]',
})
export class HasRoleDirective {
    private roles: string[] = [];

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authService: AuthService,
    ) {}

    @Input()
    set hasRole(role: string | string[]) {
        this.roles = Array.isArray(role) ? role : [role];
        this.updateView();
    }

    private updateView() {
        if (this.authService.hasAnyRole(this.roles)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
