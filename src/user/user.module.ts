import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Users } from 'src/entity/users.entity';
import { RoleRepository, UserRepository } from './user.reponsitory';
import { UsersService } from './user.service';

@Module({
    imports:[TypeOrmModule.forFeature([UserRepository]),TypeOrmModule.forFeature([RoleRepository])],
    providers: [UsersService],
    exports: [UsersService],
})
export class UserModule { }
