import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { CreateAdminDto } from './admins.dto';
import { v4 as uuid } from 'uuid';
import { Between } from 'typeorm';


@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>
  ) {}

  async getAllUsers(): Promise<AdminEntity[]> {
    return await this.adminRepository.find();
  }

  async getUserById(id: number): Promise<AdminEntity> {
    const user = await this.adminRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async createUser(dto: CreateAdminDto): Promise<AdminEntity> {
    const newUser = this.adminRepository.create(dto);
    return await this.adminRepository.save(newUser);
  }


  async updateUser(id: number, dto: CreateAdminDto): Promise<AdminEntity> {
    const user = await this.getUserById(id);
    Object.assign(user, dto);
    return await this.adminRepository.save(user);
  }

  async updateUserRole(id: number, role: 'Admin' | 'Manager' | 'Employee') {
    const user = await this.getUserById(id);
    user.role = role;
    return await this.adminRepository.save(user);
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const result = await this.adminRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`User with ID ${id} not found`);

    return { message: `User ${id} deleted successfully` };
  }

  async getUsersByDepartment(department: string) {
    return await this.adminRepository.find({ where: { department }});
  }

  async getUsersByRole(role: 'Admin' | 'Manager' | 'Employee') {
    return await this.adminRepository.find({ where: { role } });
  }

  async updateCountry(id: number, country: string): Promise<AdminEntity> {
    const user = await this.getUserById(id);
    user.country = country;
    return this.adminRepository.save(user);
  }

  async getUsersByJoiningDate(dateStr: string) {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date format. Use YYYY-MM-DD');
    }

    const start = new Date(date);
    const end = new Date(date);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return await this.adminRepository.find({
      where: {
        joiningDate: Between(start, end),
      },
    });
  }

  async getUsersWithDefaultCountry(): Promise<AdminEntity[]> {
    return await this.adminRepository.find({
      where: { country: 'Unknown' }
    });
  }
}
