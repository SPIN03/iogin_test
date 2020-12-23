import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from './user.service';

@Module({
    providers: [UsersService],
    exports: [UsersService],
})
export class UserModule { }
