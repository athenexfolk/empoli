export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email?: string;
  phoneNumber?: string;
  hireDate: Date;
  jobTitle: string;
  department: string;
  status: boolean;
}
