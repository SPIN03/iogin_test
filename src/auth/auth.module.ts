import { Module } from '@nestjs/common';
import { LoginModule } from 'src/login/login.module';
import { AuthService } from './auth.service';

@Module({
  imports: [LoginModule],
  providers: [AuthService]
})
export class AuthModule { }
