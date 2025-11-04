import { Injectable } from '@nestjs/common';
import { UserDTO } from './users.dto';

@Injectable()
export class UsersService {
    getAllUsers(): string {
        return 'All Users fetched successfully';
    }

    getUserById(id: number): object {
        console.log(`Fetching user with ID: ${id}`);
        return {
            message: `User ${id} details`,
            data: { id, name: 'John Doe', role: 'Employee' }
        };
    }

    createUser(mydata: UserDTO): object {
        console.log("Service received");
        return {
            message: "User created successfully",
            data: mydata
        };
    }

    updateUser(id: number, mydata: UserDTO): object {
        console.log(`Updating user with ID: ${id}`);
        console.log(mydata);
        return {
            message: `User ${id} updated successfully`,
            data: mydata
        };
    }

    updateUserRole(id: number, role: string): object {
        console.log(`Updating role for user ${id} to ${role}`);
        return {
            message: `User ${id} role updated`,
            newRole: role
        };
    }

    deleteUser(id: number): object {
        console.log(`Deleting user with ID: ${id}`);
        return {
            message: `User ${id} deleted successfully`
        };
    }

    getUsersByDepartment(department: string): object {
        console.log(`Fetching users in department: ${department}`);
        return {
            message: `Users from ${department} department`,
            data: [{ Firstname: 'Alice' }, { Lastname: 'Bob' }]
        };
    }

    getUsersByRole(role: string): object {
        console.log(`Fetching users with role: ${role}`);
        return {
            message: `Users with role: ${role}`,
            data: [{ name: 'John' }, { name: 'Emma' }]
        };
    }
}
