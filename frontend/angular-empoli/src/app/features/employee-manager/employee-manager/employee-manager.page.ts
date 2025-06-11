import { Component } from '@angular/core';
import { EmployeeList } from '../employee-list/employee-list';
import { Toggler } from '../../../shared/utils/toggler';
import { AddEmployee } from '../add-employee/add-employee';

@Component({
  selector: 'app-employee-manager',
  imports: [EmployeeList, AddEmployee],
  templateUrl: './employee-manager.page.html',
  styleUrl: './employee-manager.page.css',
})
export class EmployeeManagerPage {
  addPanel = new Toggler();
}
