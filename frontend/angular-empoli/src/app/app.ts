import { Component } from '@angular/core';
import { DashboardPage } from "./features/dashboard/dashboard/dashboard.page";
import { EmployeeManagerPage } from "./features/employee-manager/employee-manager/employee-manager.page";

@Component({
  selector: 'app-root',
  imports: [DashboardPage, EmployeeManagerPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'angular-empoli';
}
