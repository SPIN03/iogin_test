import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async compareHash(password: string, hash: string): Promise<boolean> {
    
        return bcrypt.compare(password, hash);
    }
    async validateUser(username: string, pass: string): Promise<any> {
        console.log("พาส :",pass)
        const user = await this.usersService.findOne(username);
        console.log("user fine :" ,user)
        const passwordhash = await this.compareHash(pass,user.password)
        console.log('พาสแฮช :',passwordhash)
        try{
            if (!passwordhash) throw new Error('รหัสผ่านไม่ตรง') 
                const { password, ...result } = user;
                console.log("authservice-result :",result)
                return result;
            
        }catch(error){
            throw new BadRequestException({
                success: false,
                message: error.message,
            }); 
        }
       
      
    }
    async login(user: any) {
        const payload = { username: user.username, sub: user.userId ,roleid:user.roleid };

        return {
            access_token: this.jwtService.sign(payload),
            data: payload
       };
    }
}
