export interface CreateEmployeeDto {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email?: string;
  phoneNumber?: string;
  hireDate: string;
  jobTitle: string;
  department: string;
}
