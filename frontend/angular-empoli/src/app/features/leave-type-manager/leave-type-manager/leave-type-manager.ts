import { Component } from '@angular/core';
import { LeaveTypeList } from '../leave-type-list/leave-type-list';
import { RouterLink } from '@angular/router';
import { PageWrapper } from '../../../shared/components/page-wrapper/page-wrapper';
import { Button } from '../../../shared/components/button/button';
import { Icon } from '../../../shared/components/icon/icon';

@Component({
  selector: 'leave-type-manager',
  imports: [LeaveTypeList, RouterLink, PageWrapper, Button, Icon],
  templateUrl: './leave-type-manager.html',
  styleUrl: './leave-type-manager.css',
})
export class LeaveTypeManager {}
