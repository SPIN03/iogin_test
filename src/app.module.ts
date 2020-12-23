import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';



@Module({
  imports: [UserModule, AuthModule, UserModule, LoginModule],

})
export class AppModule { }
