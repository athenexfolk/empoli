import { Component } from '@angular/core';
import { EmployeeCount } from "../employee-count/employee-count";

@Component({
  selector: 'app-dashboard',
  imports: [EmployeeCount],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.css'
})
export class DashboardPage {

}
