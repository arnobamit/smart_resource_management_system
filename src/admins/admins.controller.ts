import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';

import { AdminsService } from './admins.service';
import { CreateAdminDto } from './admins.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  getAllUsers() {
    return this.adminsService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.adminsService.getUserById(id);
  }

  @Get('filter/department')
  getUsersByDepartment(@Query('department') department: string) {
    return this.adminsService.getUsersByDepartment(department);
  }

  @Get('filter/role')
  getUsersByRole(@Query('role') role: 'Admin' | 'Manager' | 'Employee') {
    return this.adminsService.getUsersByRole(role);
  }

  @Get('filter/joining-date')
  getUsersByJoiningDate(@Query('date') date: string) {
    return this.adminsService.getUsersByJoiningDate(date);
  }

  @Get('filter/default-country')
  getUsersWithDefaultCountry() {
    return this.adminsService.getUsersWithDefaultCountry();
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createUser(@Body() dto: CreateAdminDto) {
    return this.adminsService.createUser(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateAdminDto) {
    return this.adminsService.updateUser(id, dto);
  }

  @Patch(':id/role')
  updateUserRole(@Param('id', ParseIntPipe) id: number, @Body('role') role: string) {
    const validRoles = ['Admin', 'Manager', 'Employee'];
    if (!validRoles.includes(role)) {
      throw new BadRequestException(`Invalid role. Allowed: ${validRoles.join(', ')}`);
    }
    return this.adminsService.updateUserRole(id, role as any);
  }

  @Patch(':id/country')
  updateCountry(@Param('id', ParseIntPipe) id: number, @Body('country') country: string) {
    return this.adminsService.updateCountry(id, country);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminsService.deleteUser(id);
  }

  @Post('upload-nid')
  @UseInterceptors(
    FileInterceptor('nid', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|jpeg|png|webp)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'nid'), false);
        }
      },
      limits: { fileSize: 2 * 1024 * 1024 },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    })
  )
  uploadNid(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded or invalid file type.');

    return {
      message: 'NID image uploaded successfully!',
      filename: file.filename,
      size: `${file.size} bytes`,
      path: file.path,
    };
  }
}
