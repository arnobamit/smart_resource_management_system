import { IsString, IsEmail, Matches, IsNotEmpty, IsDateString, IsUrl, IsOptional } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name must contain only alphabets and spaces' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(/^(?=.*[@#$&]).+$/, {
    message: 'Password must contain at least one special character (@, #, $, &)',
  })
  password: string;

  @IsOptional()
  @IsDateString({}, { message: 'Provided date must be a valid date string (YYYY-MM-DD)' })
  joiningDate: string;

  @IsOptional()
  @IsUrl({}, { message: 'Social media link must be a valid URL' })
  linkedin: string;

  department: string;

  role: 'Admin' | 'DepartmentHead' | 'Employee';
}
