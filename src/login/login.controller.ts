import { Controller, Request, Post, UseGuards, Get, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { RoleCreateDto } from 'src/dto/role-create.dto';
import { UserCreateDto } from 'src/dto/user-create.dto';
import { UsersService } from 'src/user/user.service';

@Controller('login')
export class LoginController {
    
    constructor(private authService: AuthService,private readonly userservice : UsersService) {}
   
    // @UseGuards(LocalStrategy)
    // @
    

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
      console.log("req-user :",req.user)
        return this.authService.login(req.user);

    }


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getprofile(@Request() req) {
      console.log(req.user)
      // return  this.userservice.profile(req.user.username);
      return req.user;
    }
    
    
    @UseGuards(JwtAuthGuard)
    @Get('getuserall')
    getuserall(){
      return this.userservice.getuserall()
    }

    @Post('adduser')
    @UsePipes(new ValidationPipe())
    async adduser(@Body() body: UserCreateDto) {
        return this.userservice.adduser(body);
    }
    @Post('addrole')
    @UsePipes(new ValidationPipe())
    async addrole(@Body() body: RoleCreateDto) {
        return this.userservice.addrole(body);
    }

}
