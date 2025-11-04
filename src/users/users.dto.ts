export class UserDTO {
  name: string;
  email: string;
  department: string;
  role: 'Admin' | 'DepartmentHead' | 'Employee';
}
