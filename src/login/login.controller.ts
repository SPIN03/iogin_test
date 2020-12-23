import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/roles.decorator';

@Controller('login')
export class LoginController {
    constructor(private authService: AuthService) {}
   
    @UseGuards(LocalAuthGuard)
    // @Roles(Role.Admin)
    @Post('auth/login')
    async login(@Request() req) {
      console.log("req-user :",req.user)
        return this.authService.login(req.user);

    }
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
