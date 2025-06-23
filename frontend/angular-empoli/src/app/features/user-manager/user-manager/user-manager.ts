import { Component } from '@angular/core';
import { PageWrapper } from '../../../shared/components/page-wrapper/page-wrapper';
import { Button } from '../../../shared/components/button/button';
import { Icon } from '../../../shared/components/icon/icon';
import { UserList } from '../user-list/user-list';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-user-manager',
    imports: [PageWrapper, Button, Icon, UserList, RouterLink],
    templateUrl: './user-manager.html',
    styleUrl: './user-manager.css',
})
export class UserManager {}
