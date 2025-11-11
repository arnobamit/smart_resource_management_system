import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UsePipes, ValidationPipe,
    UploadedFile, UseInterceptors, BadRequestException,} from '@nestjs/common';
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
  getUserById(@Param('id') id: number) {
    return this.adminsService.getUserById(id);
  }

  @Get('filter/department')
  getUsersByDepartment(@Query('department') department: string) {
    return this.adminsService.getUsersByDepartment(department);
  }

  @Get('filter/role')
  getUsersByRole(@Query('role') role: string) {
    return this.adminsService.getUsersByRole(role);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() mydata: CreateAdminDto) {
    return this.adminsService.createUser(mydata);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateUser(@Param('id') id: number, @Body() mydata: CreateAdminDto) {
    return this.adminsService.updateUser(id, mydata);
  }

  @Patch(':id/role')
  @UsePipes(new ValidationPipe())
  updateUserRole(@Param('id') id: number, @Body('role') role: string) {
    return this.adminsService.updateUserRole(id, role);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
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
    }),
  )
  uploadNid(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded or invalid file type.');
    }

    return {
      message: 'NID image uploaded successfully!',
      filename: file.filename,
      size: file.size + ' bytes',
      path: file.path,
    };
  }
}
