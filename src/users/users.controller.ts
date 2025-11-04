import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id') id: number) {
        return this.usersService.getUserById(id);
    }

    @Get('filter/department')
    getUsersByDepartment(@Query('department') department: string) {
        return this.usersService.getUsersByDepartment(department);
    }

    @Get('filter/role')
    getUsersByRole(@Query('role') role: string) {
        return this.usersService.getUsersByRole(role);
    }

    @Post()
    createUser(@Body() mydata: UserDTO) {
        return this.usersService.createUser(mydata);
    }

    @Put(':id')
    updateUser(@Param('id') id: number, @Body() mydata: UserDTO) {
        return this.usersService.updateUser(id, mydata);
    }

    @Patch(':id/role')
    updateUserRole(@Param('id') id: number, @Body('role') role: string) {
        return this.usersService.updateUserRole(id, role);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.usersService.deleteUser(id);
    }
}