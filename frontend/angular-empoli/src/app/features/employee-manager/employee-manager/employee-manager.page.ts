import { Component } from '@angular/core';
import { EmployeeList } from '../employee-list/employee-list';
import { RouterLink } from '@angular/router';
import { PageWrapper } from '../../../shared/components/page-wrapper/page-wrapper';
import { Button } from '../../../shared/components/button/button';
import { Icon } from '../../../shared/components/icon/icon';

@Component({
    selector: 'employee-manager',
    imports: [EmployeeList, RouterLink, PageWrapper, Button, Icon],
    templateUrl: './employee-manager.page.html',
    styleUrl: './employee-manager.page.css',
})
export class EmployeeManagerPage {}
