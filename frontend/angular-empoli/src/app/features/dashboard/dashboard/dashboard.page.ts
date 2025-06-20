import { Component } from '@angular/core';
import { EmployeeCount } from "../employee-count/employee-count";
import { PageWrapper } from '../../../shared/components/page-wrapper/page-wrapper';

@Component({
  selector: 'app-dashboard',
  imports: [EmployeeCount, PageWrapper],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.css'
})
export class DashboardPage {

}
