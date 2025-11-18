import { IsString, IsEmail, Matches, IsNotEmpty, IsOptional, IsDateString, Length } from 'class-validator';

export class CreateAdminDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  @Length(1, 150)
  uniqueId?: string;


  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must contain only alphabets and spaces',
  })
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
  nid_number: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  role: 'Admin' | 'Manager' | 'Employee';

  @IsOptional()
  @IsDateString()
  joiningDate?: string;

  @IsString()
  @Length(0, 30)
  @IsOptional()
  country?: string = 'Unknown';
}
