import { IsString, IsEmail, Matches, IsNotEmpty, IsDateString, IsUrl, IsOptional } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name must contain only alphabets and spaces' })
  name: string;

  @IsEmail({}, { message: 'Email address must be valid' })
  @Matches(/^[\w.%+-]+@[\w.-]+\.xyz$/, {
    message: 'Email must end with the .xyz domain',
  })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(/^(?=.*[@#$&]).+$/, {
    message: 'Password must contain at least one special character (@, #, $, &)',
  })
  password: string;

  @Matches(/^\d{10,17}$/, {
    message: 'NID number must contain only digits (10-17 numbers allowed)',
  })
  nidNumber: string;

  department: string;

  role: 'Admin' | 'Manager' | 'Employee';
}
