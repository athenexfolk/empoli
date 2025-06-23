import { Component } from '@angular/core';
import { PageWrapper } from '../../../shared/components/page-wrapper/page-wrapper';
import { Button } from '../../../shared/components/button/button';
import { Icon } from '../../../shared/components/icon/icon';
import { RoleList } from '../role-list/role-list';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-role-manager',
    imports: [PageWrapper, Button, Icon, RoleList, RouterLink],
    templateUrl: './role-manager.html',
    styleUrl: './role-manager.css',
})
export class RoleManager {}
