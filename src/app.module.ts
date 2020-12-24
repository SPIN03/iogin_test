import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { orm_config } from './orm.config';



@Module({
  imports: [UserModule, AuthModule, UserModule, TypeOrmModule.forRoot(orm_config), LoginModule],

})
export class AppModule { }
