import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './admins.dto';

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
}